import { useEffect, useState } from "react";
import { reportsApi } from "@/services/reportsApi";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import Badge from "@/components/ui/Badge";
import {
  DownloadCloud,
  FileSpreadsheet,
  Plus,
  FileText,
  BarChart3,
  Users,
  Receipt,
} from "lucide-react";
import { toast } from "sonner";

const reportTypes = [
  {
    value: "revenue",
    label: "Revenues Sheet & Income",
    sublabel: "Monthly billing summary",
    icon: Receipt,
    color: "blue",
  },
  {
    value: "orders",
    label: "Print Orders Dispatch List",
    sublabel: "Order fulfillment breakdown",
    icon: BarChart3,
    color: "indigo",
  },
  {
    value: "quotes",
    label: "Audited Customer Quotes",
    sublabel: "Quote specification summaries",
    icon: FileText,
    color: "emerald",
  },
  {
    value: "users",
    label: "Registered Business PAN/VAT",
    sublabel: "Client verification records",
    icon: Users,
    color: "amber",
  },
];

const colorClasses: Record<string, string> = {
  blue: "bg-accent-soft text-accent",
  indigo: "bg-accent-soft text-accent",
  emerald: "bg-accent-soft text-accent",
  amber: "bg-accent-soft text-accent",
};

export default function AdminReports() {
  const [reports, setReports] = useState<any[]>([]);
  const [generating, setGenerating] = useState(false);
  const [selectedType, setSelectedType] = useState("revenue");
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await reportsApi.getAll();
      setReports(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const selected = reportTypes.find((r) => r.value === selectedType);
      const title = selected?.label || "Report";
      const type = selectedType === "revenue" || selectedType === "quotes" ? "PDF" : "CSV";

      const newReport = await reportsApi.generate(title, type);
      setReports((prev) => [newReport, ...prev]);
      toast.success(`"${title}" generated successfully.`);
    } catch (err) {
      toast.error("Failed to generate report sheets");
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = (title: string) => {
    toast.success(`Downloading "${title}"`);
  };

  const selectedTypeInfo = reportTypes.find((r) => r.value === selectedType);
  const SelectedIcon = selectedTypeInfo?.icon || FileSpreadsheet;

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="font-display text-2xl tracking-tight text-ink">Financial & Order Reports</h1>
        <p className="text-sm text-muted mt-1">
          Export audit sheets, PAN/VAT summaries, and print operations spreadsheets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left — Report Builder Panel */}
        <div className="space-y-5">
          <h3 className="font-bold text-sm text-ink uppercase tracking-wide">Generate Export</h3>

          <Card className="p-6 border border-line space-y-5">

            {/* Report Type Selector */}
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
                        isSelected
                          ? "border-accent bg-accent-soft"
                          : "border-line hover:bg-paper-dim"
                      }`}
                    >
                      <div
                        className={`h-8 w-8 rounded-sm flex items-center justify-center shrink-0 ${
                          isSelected ? colorClasses[rt.color] : "bg-surface-2 text-muted"
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
                      {isSelected && (
                        <div className="h-1.5 w-1.5 rounded-full bg-accent shrink-0 ml-auto" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected preview */}
            <div className={`p-3 rounded-sm border border-dashed ${
              selectedTypeInfo
                ? "border-accent bg-accent-soft"
                : "border-line"
            }`}>
              <div className="flex items-center gap-2 text-xs text-ink-soft">
                <SelectedIcon size={13} className="text-accent shrink-0" />
                <span>
                  Will export as <strong>{selectedType === "revenue" || selectedType === "quotes" ? "PDF" : "CSV"}</strong>
                </span>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              loading={generating}
              leftIcon={<Plus size={15} />}
              className="w-full"
            >
              Compile Report Sheet
            </Button>
          </Card>
        </div>

        {/* Right — Generated Reports List */}
        <div className="lg:col-span-2 space-y-5">
          <h3 className="font-bold text-sm text-ink uppercase tracking-wide">Generated Catalog</h3>

          <Card className="border border-line overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-sm text-muted">Checking spreadsheets index...</div>
            ) : reports.length === 0 ? (
              <div className="p-16 text-center space-y-3">
                <div className="h-14 w-14 rounded-sm bg-surface-2 flex items-center justify-center mx-auto">
                  <FileSpreadsheet size={24} className="text-muted" />
                </div>
                <div>
                  <p className="font-semibold text-ink text-sm">No reports compiled</p>
                  <p className="text-xs text-muted mt-1">Select a report category on the left to export records.</p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-line">
                {reports.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-5 flex items-center justify-between gap-4 hover:bg-paper-dim transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="h-10 w-10 rounded-sm bg-accent-soft text-accent flex items-center justify-center shrink-0">
                        <FileSpreadsheet size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-ink truncate">{rep.title}</p>
                        <p className="text-[11px] text-muted mt-0.5">
                          {rep.size} &bull; {rep.type} &bull; Generated {new Date(rep.createdAt || rep.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <Badge variant="success">Completed</Badge>
                      <button
                        onClick={() => handleDownload(rep.title)}
                        className="p-2 text-muted hover:text-accent hover:bg-surface-2 rounded-sm transition-colors"
                        title="Download sheet"
                      >
                        <DownloadCloud size={17} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
}
