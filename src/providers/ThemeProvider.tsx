import { type ReactNode, useEffect } from "react";
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
