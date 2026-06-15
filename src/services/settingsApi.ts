import api from "./api";
import type { AppSettings } from "@/types/settings.types";
import type { CompanyInfo } from "@/types/company.types";

const DEFAULT_SETTINGS: AppSettings = {
  darkMode: false,
  language: "en",
  notifications: true,
};

export const settingsApi = {
  getSettings: async (): Promise<AppSettings> => {
    const data = localStorage.getItem("ss_settings");
    return data ? JSON.parse(data) : DEFAULT_SETTINGS;
  },

  saveSettings: async (settings: AppSettings): Promise<AppSettings> => {
    localStorage.setItem("ss_settings", JSON.stringify(settings));
    return settings;
  },

  getCompanyInfo: async (): Promise<CompanyInfo> => {
    const res = await api.get("/settings/company-info");
    return res.data.data;
  },

  saveCompanyInfo: async (info: CompanyInfo): Promise<CompanyInfo> => {
    const res = await api.put("/settings/company-info", info);
    return res.data.data;
  },
};
