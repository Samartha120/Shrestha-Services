import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/common/Button";
import { UserX, Shield, Search, Users } from "lucide-react";
import { toast } from "sonner";
export default function AdminUsers() {
    const { users, fetchUsers, updateUserRole, deleteUser, isLoading } = useUserStore();
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        fetchUsers();
    }, []);
    const handleToggleRole = async (userId, currentRole) => {
        const nextRole = currentRole === "admin" ? "customer" : "admin";
        try {
            await updateUserRole(userId, nextRole);
            toast.success(`User role changed to ${nextRole}`);
        }
        catch {
            toast.error("Failed to change user role");
        }
    };
    const handleDelete = async (userId) => {
        if (!confirm("Are you sure you want to delete this user profile?"))
            return;
        try {
            await deleteUser(userId);
            toast.success("User profile deleted successfully");
        }
        catch {
            toast.error("Failed to delete user profile");
        }
    };
    const filteredUsers = users.filter((u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()));
    const adminCount = users.filter((u) => u.role === "admin").length;
    const customerCount = users.filter((u) => u.role === "customer").length;
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight text-slate-900 dark:text-white", children: "Users Directory" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: "Review, configure, and update roles for clients and admins." })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300", children: [_jsx(Users, { size: 13 }), users.length, " Total"] }), _jsxs("div", { className: "flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400", children: [_jsx(Shield, { size: 13 }), adminCount, " Admins"] }), _jsxs("div", { className: "flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/40 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400", children: [_jsx(Users, { size: 13 }), customerCount, " Clients"] })] })] }), _jsxs("div", { className: "relative max-w-sm", children: [_jsx(Search, { size: 15, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search by name or email...", className: "w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" })] }), _jsx(Card, { className: "border border-slate-200/80 dark:border-slate-800 overflow-hidden", children: isLoading ? (_jsxs("div", { className: "flex flex-col items-center justify-center py-20 gap-3", children: [_jsx("div", { className: "h-7 w-7 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" }), _jsx("p", { className: "text-sm text-slate-500", children: "Syncing users database..." })] })) : filteredUsers.length === 0 ? (_jsxs("div", { className: "p-16 text-center space-y-3", children: [_jsx("div", { className: "h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto", children: _jsx(Users, { size: 24, className: "text-slate-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-slate-700 dark:text-slate-300 text-sm", children: "No users found" }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: searchQuery ? `No results for "${searchQuery}"` : "No users in the system yet." })] })] })) : (_jsx("div", { className: "overflow-x-auto text-sm", children: _jsxs("table", { className: "w-full text-left border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800", children: [_jsx("th", { className: "p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "User" }), _jsx("th", { className: "p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Email Address" }), _jsx("th", { className: "p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Registered" }), _jsx("th", { className: "p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Role" }), _jsx("th", { className: "p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-800/70", children: filteredUsers.map((u) => (_jsxs("tr", { className: "hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors", children: [_jsx("td", { className: "p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm", children: u.name.charAt(0).toUpperCase() }), _jsx("span", { className: "font-semibold text-slate-900 dark:text-white", children: u.name })] }) }), _jsx("td", { className: "p-4 font-mono text-xs text-slate-500 dark:text-slate-400", children: u.email }), _jsx("td", { className: "p-4 text-xs text-slate-500 dark:text-slate-400", children: new Date(u.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) }), _jsx("td", { className: "p-4", children: _jsx(Badge, { variant: u.role === "admin" ? "success" : "primary", children: u.role }) }), _jsx("td", { className: "p-4 text-right", children: _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => handleToggleRole(u.id, u.role), leftIcon: _jsx(Shield, { size: 12 }), className: "text-xs py-1 h-7 px-2.5", children: "Toggle Role" }), _jsx(Button, { variant: "danger", size: "sm", onClick: () => handleDelete(u.id), leftIcon: _jsx(UserX, { size: 12 }), className: "text-xs py-1 h-7 px-2.5", disabled: u.email === "admin@shrestha.com", children: "Remove" })] }) })] }, u.id))) })] }) })) })] }));
}
