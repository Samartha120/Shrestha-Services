import { type ReactNode, useEffect } from "react";
import { useNotificationStore } from "@/store/notificationStore";

export type NotificationProviderProps = {
  children?: ReactNode;
};

export default function NotificationProvider({
  children,
}: NotificationProviderProps) {
  const { fetchNotifications } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return <>{children}</>;
}
