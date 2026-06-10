import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useSettingsStore } from "@/store/settingsStore";
export default function ThemeProvider({ children }) {
    const { settings, fetchSettings } = useSettingsStore();
    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);
    useEffect(() => {
        if (settings?.darkMode) {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }
    }, [settings?.darkMode]);
    return _jsx(_Fragment, { children: children });
}
