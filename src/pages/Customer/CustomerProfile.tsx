import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { authApi } from "@/services/authApi";
import Card from "@/components/ui/Card";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Link } from "react-router-dom";
import { User, Phone, MapPin, Landmark, FileText, CircleCheck as CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function CustomerProfile() {
  const { user, checkAuth } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const profile = await authApi.getProfile();
        if (!active) return;
        setName(profile.name || "");
        setEmail(profile.email || "");
        setCompanyName(profile.companyName || "");
        setRegistrationId(profile.panVatNumber || "");
        setPhone(profile.phone || "");
        setAddress(profile.address || "");
      } catch {
        if (!active) return;
        toast.error("Could not load your profile");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await authApi.updateProfile({
        name,
        companyName,
        panVatNumber: registrationId,
        phone,
        address,
      });

      // Refresh the auth store so the header/name reflect the change.
      await checkAuth();
      toast.success("Business profile updated successfully");
    } catch (err: any) {
      toast.error(err?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-48 bg-paper-dim rounded-sm" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="h-64 bg-paper-dim rounded-sm" />
            <div className="lg:col-span-2 h-96 bg-paper-dim rounded-sm" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted">
          <Link to="/my-dashboard" className="hover:underline">Dashboard</Link>
          <span>/</span>
          <span className="text-ink">Profile</span>
        </div>
        <h1 className="font-display text-2xl tracking-tight text-ink">Business Profile</h1>
        <p className="text-sm text-muted">
          Manage corporate info, PAN/VAT configurations, and dispatch billing addresses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Card Overview */}
        <div className="space-y-6">
          <Card className="p-6 border border-line rounded-sm text-center space-y-4">
            <div className="h-20 w-20 rounded-full bg-accent-soft text-accent text-2xl font-display flex items-center justify-center mx-auto">
              {name.charAt(0)}
            </div>
            <div>
              <h2 className="font-display text-lg text-ink">{name}</h2>
              <p className="text-xs text-muted">{email}</p>
              <p className="inline-block px-3 py-1 rounded-full bg-paper-dim text-[10px] uppercase font-mono tracking-wide text-muted mt-2">
                Customer Account
              </p>
            </div>
          </Card>

          <Card className="p-6 border border-line rounded-sm space-y-4 text-xs">
            <h4 className="font-mono text-ink uppercase tracking-wide">Verification Checklist</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-ink-soft">
                <CheckCircle2 size={14} className="text-ok" />
                <span>Email address verified</span>
              </div>
              <div className="flex items-center gap-2 text-ink-soft">
                <CheckCircle2
                  size={14}
                  className={companyName ? "text-ok" : "text-muted"}
                />
                <span>
                  {companyName
                    ? "Business credentials on file"
                    : "Business credentials incomplete"}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Editor Form */}
        <div className="lg:col-span-2">
          <Card className="p-6 border border-line rounded-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Contact Representative Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  leftIcon={<User size={16} className="text-muted" />}
                  required
                />
                <Input
                  label="Email Address (Static)"
                  value={email}
                  disabled
                  leftIcon={<Landmark size={16} className="text-muted" />}
                  className="bg-paper-dim text-muted"
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
                  leftIcon={<FileText size={16} className="text-muted" />}
                />
                <Input
                  label="Contact Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+977-98..."
                  leftIcon={<Phone size={16} className="text-muted" />}
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-line">
                <h3 className="font-mono text-sm text-ink flex items-center gap-2">
                  <MapPin size={16} className="text-muted" /> Delivery Address
                </h3>

                <Input
                  label="Full Delivery / Billing Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Putalisadak Chowk, Kathmandu, Bagmati Province 44600"
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-line">
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
