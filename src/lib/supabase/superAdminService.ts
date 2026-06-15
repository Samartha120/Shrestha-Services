import { supabase } from "./supabaseClient";

export const superAdminService = {
  // Read database audit logs
  getAuditLogs: async () => {
    const { data, error } = await supabase
      .from("audit_logs")
      .select("id, action, details, ip_address, user_agent, created_at, users(name, email)")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []).map((log: any) => ({
      id: log.id,
      action: log.action,
      details: log.details,
      ipAddress: log.ip_address,
      userAgent: log.user_agent,
      createdAt: log.created_at,
      user: log.users ? { name: log.users.name, email: log.users.email } : null,
    }));
  },

  // Read database activity logs
  getActivityLogs: async () => {
    const { data, error } = await supabase
      .from("activity_logs")
      .select("id, action, details, created_at, users(name, email)")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []).map((log: any) => ({
      id: log.id,
      action: log.action,
      details: log.details,
      createdAt: log.created_at,
      user: log.users ? { name: log.users.name, email: log.users.email } : null,
    }));
  },

  // Perform full roles audit
  auditUsersRoles: async () => {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, roles(name)");

    if (error) throw new Error(error.message);
    return data || [];
  },
};
