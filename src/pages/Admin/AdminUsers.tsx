import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/common/Button";
import { UserX, Shield } from "lucide-react";
import { toast } from "sonner";

export default function AdminUsers() {
  const { users, fetchUsers, updateUserRole, deleteUser, isLoading } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleRole = async (userId: string, currentRole: string) => {
    const nextRole = currentRole === "admin" ? "customer" : "admin";
    try {
      await updateUserRole(userId, nextRole);
      toast.success(`User role changed to ${nextRole}`);
    } catch (err) {
      toast.error("Failed to change user role");
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user profile?")) return;
    try {
      await deleteUser(userId);
      toast.success("User profile deleted successfully");
    } catch (err) {
      toast.error("Failed to delete user profile");
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Users Directory</h1>
        <p className="text-sm text-slate-500 mt-1">
          Review, configure, and update roles for clients and admins.
        </p>
      </div>

      {/* List */}
      <Card className="border border-slate-200/80 dark:border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-sm text-slate-500">Syncing users database...</div>
        ) : (
          <div className="overflow-x-auto text-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800">
                  <th className="p-4 font-semibold text-slate-500">User Details</th>
                  <th className="p-4 font-semibold text-slate-500">Email Address</th>
                  <th className="p-4 font-semibold text-slate-500">Registered Date</th>
                  <th className="p-4 font-semibold text-slate-500">Access Role</th>
                  <th className="p-4 font-semibold text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center">
                          {u.name.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">{u.name}</span>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-xs">{u.email}</td>
                    <td className="p-4 text-slate-500 text-xs">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <Badge variant={u.role === "admin" ? "success" : "primary"}>
                        {u.role}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleRole(u.id, u.role)}
                          leftIcon={<Shield size={12} />}
                          className="text-xs py-1 h-8 px-2"
                        >
                          Toggle Access
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(u.id)}
                          leftIcon={<UserX size={12} />}
                          className="text-xs py-1 h-8 px-2"
                          disabled={u.email === "admin@shrestha.com"} // Prevent deleting root admin
                        >
                          Remove
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

    </div>
  );
}
