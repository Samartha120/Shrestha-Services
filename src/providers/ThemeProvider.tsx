import { type ReactNode, useEffect, useCallback } from "react";
import { useSettingsStore } from "@/store/settingsStore";

export type ThemeProviderProps = {
  children?: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { settings, fetchSettings } = useSettingsStore();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    if (settings?.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings?.darkMode]);

  return <>{children}</>;
}

export function useTheme() {
  const { settings, updateSettings } = useSettingsStore();

  const setTheme = useCallback(
    async (mode: "light" | "dark") => {
      if (settings) {
        await updateSettings({ ...settings, darkMode: mode === "dark" });
      }
    },
    [settings, updateSettings]
  );

  const toggleTheme = useCallback(async () => {
    if (settings) {
      await updateSettings({ ...settings, darkMode: !settings.darkMode });
    }
  }, [settings, updateSettings]);

  return {
    isDark: settings?.darkMode ?? false,
    theme: (settings?.darkMode ? "dark" : "light") as "light" | "dark",
    setTheme,
    toggleTheme,
  };
}
