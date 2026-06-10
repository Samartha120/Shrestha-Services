import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useMemo, useState } from 'react';
export const NotificationContext = createContext(undefined);
export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const value = useMemo(() => ({
        notifications,
        add: (message) => setNotifications((prev) => [...prev, { id: crypto.randomUUID(), message }]),
        remove: (id) => setNotifications((prev) => prev.filter((n) => n.id !== id)),
    }), [notifications]);
    return _jsx(NotificationContext.Provider, { value: value, children: children });
}
