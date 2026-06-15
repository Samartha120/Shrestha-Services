import { settingsRepository } from "../repositories/settingsRepository.js";

const DEFAULT_COMPANY_INFO = {
  name: "Shrestha Services",
  logo: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=120&h=120&q=80",
  email: "info@shresthaservices.com.np",
  phone: "+977 1 4412345, +977 9851012345",
  address: "Main Road, Biratnagar, Nepal",
  description: "Your premier destination for Flex printing, Acrylic signages, vehicle wraps, and full corporate advertising and branding assets.",
};

export const settingsService = {
  getCompanyInfo: async () => {
    const info = await settingsRepository.getCompanyInfo();
    if (!info) return DEFAULT_COMPANY_INFO;
    return {
      name: info.name,
      logo: info.logo || DEFAULT_COMPANY_INFO.logo,
      email: info.email,
      phone: info.phone,
      address: info.address,
      description: info.description || "",
    };
  },

  saveCompanyInfo: async (data: any) => {
    return settingsRepository.saveCompanyInfo(data);
  },
};
