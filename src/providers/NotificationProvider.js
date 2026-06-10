import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useNotificationStore } from "@/store/notificationStore";
export default function NotificationProvider({ children, }) {
    const { fetchNotifications } = useNotificationStore();
    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);
    return _jsx(_Fragment, { children: children });
}
