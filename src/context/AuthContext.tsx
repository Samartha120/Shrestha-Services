import { createContext, useMemo, useState, type ReactNode } from 'react'

export type AuthUser = {
  id: string
  email: string
  role?: string
}

export type AuthContextValue = {
  user: AuthUser | null
  setUser: (user: AuthUser | null) => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export type AuthProviderProps = {
  children?: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const value = useMemo<AuthContextValue>(() => ({ user, setUser }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
