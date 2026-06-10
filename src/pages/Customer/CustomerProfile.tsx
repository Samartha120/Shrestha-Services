import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import Card from "@/components/ui/Card";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Link } from "react-router-dom";
import { User, Phone, MapPin, Landmark, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function CustomerProfile() {
  const { user, checkAuth } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [zip, setZip] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      
      // Load extra info from localStorage db profile if available
      const dbUsers = JSON.parse(localStorage.getItem("ss_users") || "[]");
      const matched = dbUsers.find((u: any) => u.email === user.email) || {};

      setCompanyName(matched.companyName || "");
      setRegistrationId(matched.registrationId || "");
      setPhone(matched.phone || "+977-9851088888");
      setStreet(matched.street || "Putalisadak Road");
      setCity(matched.city || "Kathmandu");
      setStateName(matched.stateName || "Bagmati Province");
      setZip(matched.zip || "44600");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Update inside ss_users
      const dbUsers = JSON.parse(localStorage.getItem("ss_users") || "[]");
      const updatedUsers = dbUsers.map((u: any) => {
        if (u.email === email) {
          return {
            ...u,
            name,
            companyName,
            registrationId,
            phone,
            street,
            city,
            stateName,
            zip,
          };
        }
        return u;
      });

      localStorage.setItem("ss_users", JSON.stringify(updatedUsers));

      // Also update currentUser details
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...currentUser, name })
      );

      await checkAuth();
      toast.success("Business profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-100">Profile</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Business Profile</h1>
        <p className="text-sm text-slate-500">
          Manage corporate info, PAN/VAT configurations, and dispatch billing addresses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Card Overview */}
        <div className="space-y-6">
          <Card className="p-6 border border-slate-200/80 dark:border-slate-800 text-center space-y-4">
            <div className="h-20 w-20 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 text-2xl font-extrabold flex items-center justify-center mx-auto shadow-md">
              {name.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{name}</h2>
              <p className="text-xs text-slate-500">{email}</p>
              <p className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] uppercase font-bold text-slate-500 mt-2">
                Customer Account
              </p>
            </div>
          </Card>

          <Card className="p-6 border border-slate-200/80 dark:border-slate-800 space-y-4 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">Verification Checklist</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-350">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Email address verified</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-355">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Business credentials loaded</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Editor Form */}
        <div className="lg:col-span-2">
          <Card className="p-6 border border-slate-200/80 dark:border-slate-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Contact Representative Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  leftIcon={<User size={16} className="text-slate-400" />}
                  required
                />
                <Input
                  label="Email Address (Static)"
                  value={email}
                  disabled
                  leftIcon={<Landmark size={16} className="text-slate-400" />}
                  className="bg-slate-50 text-slate-500"
                />
                <Input
                  label="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Acme Agency Pvt. Ltd."
                />
                <Input
                  label="PAN or VAT Registration ID"
                  value={registrationId}
                  onChange={(e) => setRegistrationId(e.target.value)}
                  placeholder="PAN number"
                  leftIcon={<FileText size={16} className="text-slate-400" />}
                />
                <Input
                  label="Contact Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+977-98..."
                  leftIcon={<Phone size={16} className="text-slate-400" />}
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <MapPin size={16} className="text-slate-400" /> Delivery Address
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Input
                      label="Street Line"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="e.g. Putalisadak Chowk"
                    />
                  </div>
                  <Input
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Kathmandu"
                  />
                  <Input
                    label="State / Province"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    placeholder="Bagmati Province"
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="Postal (Zip) Code"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="e.g. 44600"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button type="submit" loading={saving}>
                  Save Settings
                </Button>
              </div>

            </form>
          </Card>
        </div>

      </div>

    </div>
  );
}
