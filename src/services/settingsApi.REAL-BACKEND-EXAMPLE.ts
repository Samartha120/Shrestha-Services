
// 🚀 EXAMPLE: How to replace mock API with real backend calls!
// Replace your actual src/services/settingsApi.ts with this file!

import type { AppSettings } from "@/types/settings.types";
import type { CompanyInfo } from "@/types/company.types";

// Your API base URL - you can import this from an env file!
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// 🔑 Auth helper (add token to requests if needed)
const getAuthHeaders = () =&gt; {
  const token = localStorage.getItem("ss_auth_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const DEFAULT_SETTINGS: AppSettings = {
  darkMode: false,
  language: "en",
  notifications: true,
};

const DEFAULT_COMPANY_INFO: CompanyInfo = {
  name: "Shrestha Services",
  logo: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&amp;fit=crop&amp;w=120&amp;h=120&amp;q=80",
  email: "info@shresthaservices.com.np",
  phone: "+977 1 4412345, +977 9851012345",
  address: "Main Road, Biratnagar, Nepal",
  description: "Your premier destination for Flex printing, Acrylic signages, vehicle wraps, and full corporate advertising and branding assets.",
};

export const settingsApi = {
  // 📥 Get user settings from backend
  getSettings: async (): Promise&lt;AppSettings&gt; =&gt; {
    try {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        // Fallback to localStorage if backend fails
        const data = localStorage.getItem("ss_settings");
        return data ? JSON.parse(data) : DEFAULT_SETTINGS;
      }
      
      const data = await response.json();
      // Save to localStorage as backup
      localStorage.setItem("ss_settings", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Failed to fetch settings from backend, using localStorage backup:", error);
      const data = localStorage.getItem("ss_settings");
      return data ? JSON.parse(data) : DEFAULT_SETTINGS;
    }
  },

  // 📤 Save user settings to backend
  saveSettings: async (settings: AppSettings): Promise&lt;AppSettings&gt; =&gt; {
    try {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: "PUT", // or POST depending on your API
        headers: getAuthHeaders(),
        body: JSON.stringify(settings),
      });
      
      if (!response.ok) {
        throw new Error("Failed to save settings to backend");
      }
      
      const data = await response.json();
      // Save to localStorage as backup
      localStorage.setItem("ss_settings", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Failed to save settings to backend, but saved to localStorage:", error);
      // Still save to localStorage even if backend fails
      localStorage.setItem("ss_settings", JSON.stringify(settings));
      return settings;
    }
  },

  // 📥 Get company info from backend
  getCompanyInfo: async (): Promise&lt;CompanyInfo&gt; =&gt; {
    try {
      const response = await fetch(`${API_BASE_URL}/company-info`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        const data = localStorage.getItem("ss_company_info");
        return data ? JSON.parse(data) : DEFAULT_COMPANY_INFO;
      }
      
      const data = await response.json();
      localStorage.setItem("ss_company_info", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Failed to fetch company info, using localStorage backup:", error);
      const data = localStorage.getItem("ss_company_info");
      return data ? JSON.parse(data) : DEFAULT_COMPANY_INFO;
    }
  },

  // 📤 Save company info to backend
  saveCompanyInfo: async (info: CompanyInfo): Promise&lt;CompanyInfo&gt; =&gt; {
    try {
      const response = await fetch(`${API_BASE_URL}/company-info`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(info),
      });
      
      if (!response.ok) {
        throw new Error("Failed to save company info");
      }
      
      const data = await response.json();
      localStorage.setItem("ss_company_info", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Failed to save company info to backend, but saved to localStorage:", error);
      localStorage.setItem("ss_company_info", JSON.stringify(info));
      return info;
    }
  },
};
