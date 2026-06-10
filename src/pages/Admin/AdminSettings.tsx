import { useEffect, useState } from "react";
import { useSettingsStore } from "@/store/settingsStore";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { Landmark, Mail, Phone, MapPin, Sliders } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettings() {
  const { companyInfo, fetchCompanyInfo, updateCompanyInfo, isLoading } = useSettingsStore();

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const [taxRate, setTaxRate] = useState(13); // Default VAT in Nepal
  const [multiplier, setMultiplier] = useState(1.0);
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

      // Save custom variables in localstorage settings
      localStorage.setItem("ss_tax_rate", taxRate.toString());
      localStorage.setItem("ss_pricing_multiplier", multiplier.toString());

      toast.success("System configurations updated successfully");
    } catch (err) {
      toast.error("Failed to save configuration settings");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-12 text-center text-sm text-slate-500">Retrieving system settings...</div>;
  }

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">System Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure shop coordinates, Nepalese tax VAT ratios, and support emails.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column */}
        <div className="space-y-6">
          <Card className="p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="h-4.5 w-4.5 text-blue-500" /> Print Variables
            </h3>
            
            <div className="space-y-4 text-sm">
              <Input
                label="Nepal VAT Rate (%)"
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                placeholder="13"
              />
              <Input
                label="Raw Material Pricing Multiplier"
                type="number"
                step="0.1"
                value={multiplier}
                onChange={(e) => setMultiplier(Number(e.target.value))}
                placeholder="1.0"
              />
            </div>
          </Card>
        </div>

        {/* Right Form Editor Column */}
        <div className="lg:col-span-2">
          <Card className="p-6 border border-slate-200/80 dark:border-slate-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <Input
                  label="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Shrestha Services"
                  leftIcon={<Landmark size={16} className="text-slate-400" />}
                  required
                />
                <Input
                  label="Support Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@shrestha.com"
                  leftIcon={<Mail size={16} className="text-slate-400" />}
                  required
                />
                <div className="md:col-span-2">
                  <Input
                    label="Official Contacts (comma separated)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+977-1-4412345"
                    leftIcon={<Phone size={16} className="text-slate-400" />}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Input
                    label="Office Address coordinates"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Main Road, Biratnagar"
                    leftIcon={<MapPin size={16} className="text-slate-400" />}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 text-sm pt-4 border-t border-slate-100 dark:border-slate-800">
                <label className="text-sm font-semibold">Corporate Agency Summary</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Company overview highlights, machinery models..."
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 min-h-[100px] focus:ring-2 focus:ring-blue-500 text-sm focus:outline-none dark:bg-slate-900 dark:border-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button type="submit" loading={saving}>
                  Save System Variables
                </Button>
              </div>

            </form>
          </Card>
        </div>

      </div>

    </div>
  );
}
