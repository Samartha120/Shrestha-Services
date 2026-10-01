import { useEffect, useState } from "react";
import { useSettingsStore } from "@/store/settingsStore";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { Landmark, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettings() {
  const { companyInfo, fetchCompanyInfo, updateCompanyInfo, isLoading } = useSettingsStore();

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  useEffect(() => {
    if (companyInfo) {
      setCompanyName(companyInfo.name);
      setEmail(companyInfo.email);
      setPhone(companyInfo.phone);
      setAddress(companyInfo.address);
      setDescription(companyInfo.description || "");
    }
  }, [companyInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateCompanyInfo({
        name: companyName,
        email,
        phone,
        address,
        description,
        logo: companyInfo?.logo || ""
      });
      toast.success("Company settings updated successfully");
    } catch (err) {
      toast.error("Failed to save company settings");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-12 text-center text-sm text-muted">Retrieving system settings...</div>;
  }

  return (
    <div className="space-y-8 max-w-3xl">

      {/* Title */}
      <div>
        <h1 className="font-display text-2xl tracking-tight text-ink">Company Settings</h1>
        <p className="text-sm text-muted mt-1">
          Manage the business details shown across the site and in customer communications.
        </p>
      </div>

      <Card className="p-6 border border-line">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Input
              label="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Shrestha Services"
              leftIcon={<Landmark size={16} className="text-muted" />}
              required
            />
            <Input
              label="Support Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="info@shrestha.com"
              leftIcon={<Mail size={16} className="text-muted" />}
              required
            />
            <div className="md:col-span-2">
              <Input
                label="Official Contacts (comma separated)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+977-1-4412345"
                leftIcon={<Phone size={16} className="text-muted" />}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Input
                label="Office Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Main Road, Biratnagar"
                leftIcon={<MapPin size={16} className="text-muted" />}
                required
              />
            </div>
          </div>

          <div className="space-y-2 text-sm pt-4 border-t border-line">
            <label className="text-sm font-semibold text-ink">Corporate Agency Summary</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Company overview highlights, machinery models..."
              className="w-full rounded-sm border border-line bg-surface px-4 py-3 min-h-[100px] focus:border-accent text-sm focus:outline-none text-ink placeholder:text-muted"
              required
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-line">
            <Button type="submit" loading={saving}>
              Save Company Settings
            </Button>
          </div>

        </form>
      </Card>

    </div>
  );
}
