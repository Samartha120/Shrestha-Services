import { supabase } from "./supabaseClient";
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
  address: "Main Road, Biratnagar, Nepal",
  description: "Your premier destination for Flex printing, Acrylic signages, vehicle wraps, and full corporate advertising and branding assets.",
};

export const settingsService = {
  getSettings: async (): Promise<AppSettings> => {
    // App settings (theme toggle state, language) are usually stored locally for quick load,
    // but can be synchronized or read from local storage directly.
    const data = localStorage.getItem("ss_settings");
    return data ? JSON.parse(data) : DEFAULT_SETTINGS;
  },

  saveSettings: async (settings: AppSettings): Promise<AppSettings> => {
    localStorage.setItem("ss_settings", JSON.stringify(settings));
    return settings;
  },

  getCompanyInfo: async (): Promise<CompanyInfo> => {
    const { data, error } = await supabase
      .from("company_settings")
      .select("name, logo, email, phone, address, description")
      .limit(1);

    if (error || !data || data.length === 0) {
      return DEFAULT_COMPANY_INFO;
    }

    const info = data[0];
    return {
      name: info.name,
      logo: info.logo || DEFAULT_COMPANY_INFO.logo,
      email: info.email,
      phone: info.phone,
      address: info.address,
      description: info.description || "",
    };
  },

  saveCompanyInfo: async (info: CompanyInfo): Promise<CompanyInfo> => {
    // Get first row to update, or insert if none exists
    const { data: existing } = await supabase
      .from("company_settings")
      .select("id")
      .limit(1);

    let query;
    if (existing && existing.length > 0) {
      query = supabase
        .from("company_settings")
        .update({
          name: info.name,
          logo: info.logo,
          email: info.email,
          phone: info.phone,
          address: info.address,
          description: info.description,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing[0].id);
    } else {
      query = supabase
        .from("company_settings")
        .insert({
          name: info.name,
          logo: info.logo,
          email: info.email,
          phone: info.phone,
          address: info.address,
          description: info.description,
        });
    }

    const { error } = await query;
    if (error) throw new Error(error.message);

    return info;
  },
};
