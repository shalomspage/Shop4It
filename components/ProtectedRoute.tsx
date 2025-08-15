'use client'


import { useAppSelector } from '@/app/hooks'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, initialized } = useAppSelector((state) => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (initialized && !isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated, initialized, router])

  if (!initialized) return null // Optional: show loading spinner

  return <>{children}</>
}
