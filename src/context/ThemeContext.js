import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useMemo, useState } from 'react';
export const ThemeContext = createContext(undefined);
export function ThemeProvider({ children, defaultTheme = 'light' }) {
    const [theme, setTheme] = useState(defaultTheme);
    const value = useMemo(() => ({ theme, setTheme }), [theme]);
    return _jsx(ThemeContext.Provider, { value: value, children: children });
}
