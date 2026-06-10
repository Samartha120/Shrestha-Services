import { createContext, useMemo, useState, type ReactNode } from 'react'

export type NotificationItem = {
  id: string
  message: string
}

export type NotificationContextValue = {
  notifications: NotificationItem[]
  add: (message: string) => void
  remove: (id: string) => void
}

export const NotificationContext = createContext<NotificationContextValue | undefined>(undefined)

export type NotificationProviderProps = {
  children?: ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])

  const value = useMemo<NotificationContextValue>(
    () => ({
      notifications,
      add: (message) =>
        setNotifications((prev) => [...prev, { id: crypto.randomUUID(), message }]),
      remove: (id) => setNotifications((prev) => prev.filter((n) => n.id !== id)),
    }),
    [notifications]
  )

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}
