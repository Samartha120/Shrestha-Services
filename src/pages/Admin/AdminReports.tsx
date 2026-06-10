import { useEffect, useState } from "react";
import { reportsApi } from "@/services/reportsApi";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import Badge from "@/components/ui/Badge";
import { DownloadCloud, FileSpreadsheet, Plus } from "lucide-react";
import { toast } from "sonner";

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
      const title =
        selectedType === "revenue"
          ? "Revenue Summary Sheet"
          : selectedType === "orders"
          ? "Orders Breakdown Sheet"
          : selectedType === "quotes"
          ? "Quotes Specification Summary"
          : "Registered PAN VAT Clients";
      const type = selectedType === "revenue" || selectedType === "quotes" ? "PDF" : "CSV";

      const newReport = await reportsApi.generate(title, type);
      setReports((prev) => [newReport, ...prev]);
      toast.success("Billing spreadsheet generated successfully.");
    } catch (err) {
      toast.error("Failed to generate report sheets");
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = (title: string) => {
    toast.success(`Started downloading document "${title}"`);
  };

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Financial & Order Reports</h1>
        <p className="text-sm text-slate-500 mt-1">
          Export audits sheets, PAN/VAT reports, and print operations spreadsheets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Generation Panel */}
        <div className="space-y-6">
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-200 font-medium">Request Audit Export</h3>
          
          <Card className="border border-slate-200/80 dark:border-slate-800 p-6 space-y-4">
            <div className="space-y-2 text-sm">
              <label className="text-sm font-semibold">Report Parameters Category</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:ring-2 focus:ring-blue-500 text-sm focus:outline-none dark:bg-slate-900 dark:border-slate-800 text-slate-900 dark:text-white"
              >
                <option value="revenue">Revenues Sheet & Income (Monthly)</option>
                <option value="orders">Print Orders Dispatch List</option>
                <option value="quotes">Audited Customer Quotes Specifications</option>
                <option value="users">Registered Business pan/vat database</option>
              </select>
            </div>

            <Button
              onClick={handleGenerate}
              loading={generating}
              leftIcon={<Plus size={16} />}
              className="w-full"
            >
              Compile Report Sheet
            </Button>
          </Card>
        </div>

        {/* Right List Column */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">Generated Reports Catalog</h3>
          
          <Card className="border border-slate-200/80 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
            {loading ? (
              <div className="p-12 text-center text-sm text-slate-500">Checking spreadsheets index...</div>
            ) : reports.length === 0 ? (
              <div className="p-16 text-center text-slate-400 text-sm space-y-2">
                <FileSpreadsheet size={40} className="mx-auto text-slate-300" />
                <p>No exports compiled yet.</p>
                <p className="text-xs">Select a parameters sheet on the left to export records.</p>
              </div>
            ) : (
              reports.map((rep) => (
                <div key={rep.id} className="p-5 flex items-center justify-between gap-4 hover:bg-slate-55/30 dark:hover:bg-slate-900/30 transition-colors">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <FileSpreadsheet size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{rep.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {rep.size} &bull; {rep.type} &bull; Generated {new Date(rep.createdAt || rep.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant="success">Completed</Badge>
                    <button
                      onClick={() => handleDownload(rep.title)}
                      className="p-2 text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                      title="Download sheet"
                    >
                      <DownloadCloud size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </Card>
        </div>

      </div>

    </div>
  );
}
