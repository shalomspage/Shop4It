import { apiSlice } from "../../redux/services/apiSlice";

export interface User {
  id?: string;
  email: string;
  username: string;
}

interface AuthTokenResponse {
  access: string;
  refresh?: string;
}

interface LoginResponse {
  auth_token: string;  // this is what TokenAuth returns
}


interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  re_password: string;
}

interface ActivationRequest {
  uid: string;
  token: string;
}

interface ResetPasswordRequest {
  email: string;
}

interface ResetPasswordConfirmRequest {
  uid: string;
  token: string;
  new_password: string;
  re_new_password: string;
}

interface RefreshTokenRequest {
  refresh: string;
}

const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    retrieveUser: builder.query<User, void>({
      query: () => "/auth/users/me/",
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: ({ username, password }) => ({
        url: '/auth/token/login/',  
        method: 'POST',
        body: { username, password },
      }),
}),

    register: builder.mutation<User, RegisterRequest>({
      query: ({ email, username, password, re_password }) => ({
        url: "/auth/users/",
        method: "POST",
        body: { email, username, password, re_password },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    verify: builder.mutation<{ detail: string }, { token: string }>({
      query: ({ token }) => ({
        url: "/auth/token/login/",
        method: "POST",
        body: { token },
      }),
    }),

    logout: builder.mutation<{ detail: string }, void>({
      query: () => ({
        url: "/auth/logout/",
        method: "POST",
      }),
    }),

    activation: builder.mutation<{ detail: string }, ActivationRequest>({
      query: ({ uid, token }) => ({
        url: "/auth/users/activation/",
        method: "POST",
        body: { uid, token },
      }),
    }),

    resetPassword: builder.mutation<{ detail: string }, ResetPasswordRequest>({
      query: ({ email }) => ({
        url: "/auth/users/reset_password/",
        method: "POST",
        body: { email },
      }),
    }),

    resetPasswordConfirm: builder.mutation<{ detail: string }, ResetPasswordConfirmRequest>({
      query: ({ uid, token, new_password, re_new_password }) => ({
        url: "/auth/users/reset_password_confirm/",
        method: "POST",
        body: { uid, token, new_password, re_new_password },
      }),
    }),

    refreshToken: builder.mutation<AuthTokenResponse, RefreshTokenRequest>({
      query: ({ refresh }) => ({
        url: "/auth/token/refresh/",
        method: "POST",
        body: { refresh },
      }),
    }),
  }),
});

export const {
  useRetrieveUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useLogoutMutation,
  useActivationMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
  useRefreshTokenMutation,
} = authApiSlice;
