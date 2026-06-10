import { delay } from "@/utils/mockDb";
import type { AppSettings } from "@/types/settings.types";
import type { CompanyInfo } from "@/types/company.types";

const DEFAULT_SETTINGS: AppSettings = {
  darkMode: false,
  language: "en",
  notifications: true,
};

const DEFAULT_COMPANY_INFO: CompanyInfo = {
  name: "Shrestha Services",
  logo: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=120&h=120&q=80",
  email: "info@shresthaservices.com.np",
  phone: "+977 1 4412345, +977 9851012345",
  address: "Putalisadak, Kathmandu, Nepal",
  description: "Your premier destination for Flex printing, Acrylic signages, vehicle wraps, and full corporate advertising and branding assets.",
};

export const settingsApi = {
  getSettings: async (): Promise<AppSettings> => {
    await delay(300);
    const data = localStorage.getItem("ss_settings");
    return data ? JSON.parse(data) : DEFAULT_SETTINGS;
  },

  saveSettings: async (settings: AppSettings): Promise<AppSettings> => {
    await delay(500);
    localStorage.setItem("ss_settings", JSON.stringify(settings));
    return settings;
  },

  getCompanyInfo: async (): Promise<CompanyInfo> => {
    await delay(300);
    const data = localStorage.getItem("ss_company_info");
    return data ? JSON.parse(data) : DEFAULT_COMPANY_INFO;
  },

  saveCompanyInfo: async (info: CompanyInfo): Promise<CompanyInfo> => {
    await delay(600);
    localStorage.setItem("ss_company_info", JSON.stringify(info));
    return info;
  },
};
