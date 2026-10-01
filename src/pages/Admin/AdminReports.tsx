import { useState } from "react";
import { reportsApi, type ReportType } from "@/services/reportsApi";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import {
  DownloadCloud,
  FileSpreadsheet,
  FileText,
  BarChart3,
  Users,
  Receipt,
} from "lucide-react";
import { toast } from "sonner";

const reportTypes: {
  value: ReportType;
  label: string;
  sublabel: string;
  icon: typeof Receipt;
  columns: string;
}[] = [
  {
    value: "revenue",
    label: "Monthly Revenue Summary",
    sublabel: "Revenue per month (rolling 12 months)",
    icon: Receipt,
    columns: "Month, Revenue (NPR)",
  },
  {
    value: "orders",
    label: "Print Orders Dispatch List",
    sublabel: "Every order with status and total",
    icon: BarChart3,
    columns: "Order Number, Customer, Status, Total, Created",
  },
  {
    value: "quotes",
    label: "Customer Quotes Export",
    sublabel: "All quote requests and estimates",
    icon: FileText,
    columns: "Quote ID, Customer, Email, Material, Qty, Status, Estimate, Date",
  },
  {
    value: "users",
    label: "Registered Clients (PAN/VAT)",
    sublabel: "Customer verification records",
    icon: Users,
    columns: "Name, Email, Phone, Company, PAN/VAT, Verified, Registered",
  },
];

export default function AdminReports() {
  const [downloading, setDownloading] = useState<ReportType | null>(null);
  const [selectedType, setSelectedType] = useState<ReportType>("revenue");

  const handleDownload = async (type: ReportType) => {
    setDownloading(type);
    try {
      await reportsApi.download(type);
      const label = reportTypes.find((r) => r.value === type)?.label || "Report";
      toast.success(`"${label}" exported as CSV.`);
    } catch (err) {
      toast.error("Could not generate the report. Please try again.");
    } finally {
      setDownloading(null);
    }
  };

  const selectedTypeInfo = reportTypes.find((r) => r.value === selectedType)!;
  const SelectedIcon = selectedTypeInfo.icon;

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="font-display text-2xl tracking-tight text-ink">Financial & Order Reports</h1>
        <p className="text-sm text-muted mt-1">
          Export live records as CSV spreadsheets — revenue, orders, quotes and client PAN/VAT data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left — Report Builder Panel */}
        <div className="space-y-5">
          <h3 className="font-bold text-sm text-ink uppercase tracking-wide">Export Builder</h3>

          <Card className="p-6 border border-line space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted uppercase tracking-wide">
                Report Category
              </label>
              <div className="space-y-2">
                {reportTypes.map((rt) => {
                  const Icon = rt.icon;
                  const isSelected = selectedType === rt.value;
                  return (
                    <button
                      key={rt.value}
                      onClick={() => setSelectedType(rt.value)}
                      className={`w-full flex items-center gap-3 p-3 rounded-sm border text-left transition-all duration-200 ${
                        isSelected ? "border-accent bg-accent-soft" : "border-line hover:bg-paper-dim"
                      }`}
                    >
                      <div
                        className={`h-8 w-8 rounded-sm flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-accent-soft text-accent" : "bg-surface-2 text-muted"
                        }`}
                      >
                        <Icon size={15} />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-xs font-bold truncate ${isSelected ? "text-accent" : "text-ink"}`}>
                          {rt.label}
                        </p>
                        <p className="text-[10px] text-muted mt-0.5">{rt.sublabel}</p>
                      </div>
                      {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-accent shrink-0 ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-3 rounded-sm border border-dashed border-accent bg-accent-soft">
              <div className="flex items-start gap-2 text-xs text-ink-soft">
                <SelectedIcon size={13} className="text-accent shrink-0 mt-0.5" />
                <span>
                  Columns: <strong className="font-mono">{selectedTypeInfo.columns}</strong>
                </span>
              </div>
            </div>

            <Button
              onClick={() => handleDownload(selectedType)}
              loading={downloading === selectedType}
              leftIcon={<DownloadCloud size={15} />}
              className="w-full"
            >
              Download CSV
            </Button>
          </Card>
        </div>

        {/* Right — Report Catalog (quick download) */}
        <div className="lg:col-span-2 space-y-5">
          <h3 className="font-bold text-sm text-ink uppercase tracking-wide">Available Exports</h3>

          <Card className="border border-line overflow-hidden">
            <div className="divide-y divide-line">
              {reportTypes.map((rt) => {
                const Icon = rt.icon;
                return (
                  <div
                    key={rt.value}
                    className="p-5 flex items-center justify-between gap-4 hover:bg-paper-dim transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="h-10 w-10 rounded-sm bg-accent-soft text-accent flex items-center justify-center shrink-0">
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-ink truncate">{rt.label}</p>
                        <p className="text-[11px] text-muted mt-0.5">{rt.sublabel} &bull; CSV</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownload(rt.value)}
                      disabled={downloading === rt.value}
                      className="p-2 text-muted hover:text-accent hover:bg-surface-2 rounded-sm transition-colors disabled:opacity-40"
                      title={`Download ${rt.label}`}
                    >
                      <DownloadCloud size={17} className={downloading === rt.value ? "animate-pulse" : ""} />
                    </button>
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="flex items-center gap-2 text-xs text-muted">
            <FileSpreadsheet size={14} className="text-accent" />
            Exports are generated live from the database at download time — no stale snapshots.
          </div>
        </div>

      </div>
    </div>
  );
}
