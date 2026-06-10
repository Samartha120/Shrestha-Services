import { type ReactNode, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export type AuthProviderProps = {
  children?: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <>{children}</>;
}
