import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { setAuth, logout } from '../../app/features/authSlice'
import { Mutex } from 'async-mutex'
import { getBrowserCookie } from '@/components/utils/cookies'
import Cookies from 'js-cookie'

const mutex = new Mutex()

// Cookie-based storage utilities
const getAuthToken = () => ({
  accessToken: getBrowserCookie('access_token'),
  refreshToken: getBrowserCookie('refresh_token')
})

export const setAuthToken = (access: string, refresh?: string) => {
  if (typeof window !== 'undefined') {
    Cookies.set('access_token', access, {
      expires: 7,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });

    if (refresh) {
      Cookies.set('refresh_token', refresh, {
        expires: 30,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });
    }
  }
};

export const clearAuthToken = () => {
  if (typeof window !== 'undefined') {
    Cookies.remove('access_token', { path: '/' });
    Cookies.remove('refresh_token', { path: '/' });
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_HOST,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const { accessToken } = getAuthToken()
    if (accessToken) {
      headers.set('Authorization', `Token ${accessToken}`)
    }
    headers.set('Content-Type', 'application/json')
    return headers
  }
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const { refreshToken } = getAuthToken()
        if (!refreshToken) {
          clearAuthToken()
          api.dispatch(logout())
          return { error: { status: 401, data: 'Missing refresh token' } }
        }

        const refreshResult = await baseQuery(
          {
            url: '/api/auth/token/refresh/',
            method: 'POST',
            body: { refresh: refreshToken }
          },
          api,
          extraOptions
        )

        if (refreshResult.data && typeof refreshResult.data === 'object' && 'access' in refreshResult.data) {
          const { access, refresh } = refreshResult.data as {
            access: string
            refresh?: string
          }

          setAuthToken(access, refresh)
          api.dispatch(setAuth({ token: access }))
          result = await baseQuery(args, api, extraOptions)
        } else {
          clearAuthToken()
          api.dispatch(logout())
          return {
            error: {
              status: 401,
              data: refreshResult.error?.data || 'Token refresh failed'
            }
          }
        }
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Token refresh error:', err)
        }
        clearAuthToken()
        api.dispatch(logout())
        return {
          error: {
            status: 500,
            data: 'Unexpected error during token refresh'
          }
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Auth'],
  endpoints: () => ({}),
})
