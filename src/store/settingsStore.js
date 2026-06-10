import { create } from "zustand";
import { settingsApi } from "@/services/settingsApi";
export const useSettingsStore = create((set) => ({
    settings: (() => {
        try {
            const local = localStorage.getItem("ss_settings");
            return local ? JSON.parse(local) : { darkMode: false, language: "en", notifications: true };
        }
        catch (e) {
            return { darkMode: false, language: "en", notifications: true };
        }
    })(),
    companyInfo: null,
    isLoading: false,
    error: null,
    fetchSettings: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await settingsApi.getSettings();
            set({ settings: data, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to load settings", isLoading: false });
        }
    },
    updateSettings: async (newSettings) => {
        set({ isLoading: true, error: null });
        try {
            await settingsApi.saveSettings(newSettings);
            set({ settings: newSettings, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to save settings", isLoading: false });
            throw err;
        }
    },
    fetchCompanyInfo: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await settingsApi.getCompanyInfo();
            set({ companyInfo: data, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to load company details", isLoading: false });
        }
    },
    updateCompanyInfo: async (info) => {
        set({ isLoading: true, error: null });
        try {
            await settingsApi.saveCompanyInfo(info);
            set({ companyInfo: info, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to save company details", isLoading: false });
            throw err;
        }
    },
}));
