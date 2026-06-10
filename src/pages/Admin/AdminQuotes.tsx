import { useEffect, useState } from "react";
import { useQuoteStore } from "@/store/quoteStore";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Dialog from "@/components/ui/Dialog";
import { FileText, Check, X, FileType } from "lucide-react";
import { toast } from "sonner";

export default function AdminQuotes() {
  const { quotes, fetchQuotes, updateQuoteStatus, isLoading } = useQuoteStore();
  const [filter, setFilter] = useState("all");
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);
  const [priceOverride, setPriceOverride] = useState("");
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleAuditClick = (q: any) => {
    setSelectedQuote(q);
    setPriceOverride(q.estimatedPrice.toString());
    setAuditModalOpen(true);
  };

  const handleUpdateStatus = async (status: string) => {
    if (!selectedQuote) return;
    const finalPrice = priceOverride ? Number(priceOverride) : undefined;
    try {
      await updateQuoteStatus(selectedQuote.id, status, finalPrice);
      toast.success(`Quote status updated to ${status}`);
      setAuditModalOpen(false);
      setSelectedQuote(null);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const filteredQuotes = quotes.filter((q) => {
    if (filter === "all") return true;
    return q.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Quote Requests</h1>
        <p className="text-sm text-slate-500 mt-1">
          Review layout design specs, override pricing calculators, and dispatch approvals.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {["all", "pending", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all capitalize ${
              filter === tab
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List Container */}
      <Card className="border border-slate-200/80 dark:border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-sm text-slate-500">Syncing quotes catalog...</div>
        ) : filteredQuotes.length === 0 ? (
          <div className="p-16 text-center text-slate-450 text-sm space-y-2">
            <FileText size={44} className="mx-auto text-slate-300" />
            <p className="font-semibold text-slate-700 dark:text-slate-300">No quotes found</p>
            <p className="text-xs">There are no quotes matching the filter status "{filter}".</p>
          </div>
        ) : (
          <div className="overflow-x-auto text-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800">
                  <th className="p-4 font-semibold text-slate-500">ID</th>
                  <th className="p-4 font-semibold text-slate-500">Client Info</th>
                  <th className="p-4 font-semibold text-slate-500">Dimensions (WxH)</th>
                  <th className="p-4 font-semibold text-slate-500">Material Choice</th>
                  <th className="p-4 font-semibold text-slate-500">Price Quote</th>
                  <th className="p-4 font-semibold text-slate-500">Status</th>
                  <th className="p-4 font-semibold text-slate-500 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                    <td className="p-4 font-bold">{q.id}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{q.customerName}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{q.email} &bull; {q.phone}</p>
                      </div>
                    </td>
                    <td className="p-4">{q.width} x {q.height} ft</td>
                    <td className="p-4 truncate max-w-[150px]">{q.material}</td>
                    <td className="p-4 font-semibold">NPR {q.estimatedPrice}</td>
                    <td className="p-4">
                      <Badge
                        variant={
                          q.status === "Approved"
                            ? "success"
                            : q.status === "Pending"
                            ? "warning"
                            : "danger"
                        }
                      >
                        {q.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleAuditClick(q)}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Audit specs
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Audit Specifications Modal */}
      {auditModalOpen && selectedQuote && (
        <Dialog
          open={auditModalOpen}
          onClose={() => setAuditModalOpen(false)}
          title={`Quote Spec Audit - ${selectedQuote.id}`}
        >
          <div className="space-y-6 pt-4 text-sm">
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-xs font-semibold text-slate-400">Client Name</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{selectedQuote.customerName}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Contact</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{selectedQuote.phone}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Dimensions</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{selectedQuote.width} x {selectedQuote.height} ft</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Material</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{selectedQuote.material}</p>
              </div>
            </div>

            {selectedQuote.notes && (
              <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-3 border border-slate-150/40 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-400">Specifications Notes:</p>
                <p className="text-slate-700 dark:text-slate-350 mt-1 italic">"{selectedQuote.notes}"</p>
              </div>
            )}

            {selectedQuote.fileUrl && (
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800">
                <FileType className="h-8 w-8 text-blue-600 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-800 dark:text-slate-200 truncate">{selectedQuote.fileUrl}</p>
                  <p className="text-xs text-slate-500">{selectedQuote.fileWeight || "Unknown size"} &bull; {selectedQuote.fileType || "PDF / Layout"}</p>
                </div>
              </div>
            )}

            <div className="space-y-2 pt-2">
              <label className="text-sm font-semibold">Override Estimated Price (NPR)</label>
              <Input
                type="number"
                value={priceOverride}
                onChange={(e) => setPriceOverride(e.target.value)}
                placeholder="NPR 0"
              />
            </div>

            {/* Audit action items */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex gap-2">
                <Button variant="danger" leftIcon={<X size={14} />} onClick={() => handleUpdateStatus("Rejected")}>
                  Reject Quote
                </Button>
                <Button variant="primary" leftIcon={<Check size={14} />} onClick={() => handleUpdateStatus("Approved")}>
                  Approve Quote
                </Button>
              </div>
              <Button variant="outline" onClick={() => setAuditModalOpen(false)}>
                Cancel Audit
              </Button>
            </div>
          </div>
        </Dialog>
      )}

    </div>
  );
}
