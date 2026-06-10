import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useMemo, useState } from 'react';
export const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const value = useMemo(() => ({ user, setUser }), [user]);
    return _jsx(AuthContext.Provider, { value: value, children: children });
}
