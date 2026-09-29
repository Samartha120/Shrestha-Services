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
        <h1 className="font-display text-2xl tracking-tight text-ink">Quote Requests</h1>
        <p className="text-sm text-muted mt-1">
          Review layout design specs, override pricing calculators, and dispatch approvals.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-line pb-3">
        {["all", "pending", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-xs font-bold rounded-full transition-all capitalize ${
              filter === tab
                ? "bg-ink text-inverse"
                : "text-muted hover:bg-paper-dim"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List Container */}
      <Card className="border border-line overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-sm text-muted">Syncing quotes catalog...</div>
        ) : filteredQuotes.length === 0 ? (
          <div className="p-16 text-center text-muted text-sm space-y-2">
            <FileText size={44} className="mx-auto text-faint" />
            <p className="font-semibold text-ink">No quotes found</p>
            <p className="text-xs">There are no quotes matching the filter status "{filter}".</p>
          </div>
        ) : (
          <div className="overflow-x-auto text-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-paper-dim border-b border-line">
                  <th className="p-4 font-semibold text-muted uppercase text-xs tracking-wide">ID</th>
                  <th className="p-4 font-semibold text-muted uppercase text-xs tracking-wide">Client Info</th>
                  <th className="p-4 font-semibold text-muted uppercase text-xs tracking-wide">Dimensions (WxH)</th>
                  <th className="p-4 font-semibold text-muted uppercase text-xs tracking-wide">Material Choice</th>
                  <th className="p-4 font-semibold text-muted uppercase text-xs tracking-wide">Price Quote</th>
                  <th className="p-4 font-semibold text-muted uppercase text-xs tracking-wide">Status</th>
                  <th className="p-4 font-semibold text-muted uppercase text-xs tracking-wide text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filteredQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-paper-dim">
                    <td className="p-4 font-bold text-ink font-mono">{q.id}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-ink">{q.customerName}</p>
                        <p className="text-xs text-muted mt-0.5">{q.email} &bull; {q.phone}</p>
                      </div>
                    </td>
                    <td className="p-4 text-ink-soft">{q.width} x {q.height} ft</td>
                    <td className="p-4 truncate max-w-[150px] text-ink-soft">{q.material}</td>
                    <td className="p-4 font-semibold text-ink font-mono">NPR {q.estimatedPrice}</td>
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
                        className="text-xs font-bold text-accent hover:underline"
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
                <p className="text-xs font-semibold text-muted uppercase tracking-wide">Client Name</p>
                <p className="font-bold text-ink mt-0.5">{selectedQuote.customerName}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wide">Contact</p>
                <p className="font-bold text-ink mt-0.5">{selectedQuote.phone}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wide">Dimensions</p>
                <p className="font-bold text-ink mt-0.5">{selectedQuote.width} x {selectedQuote.height} ft</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wide">Material</p>
                <p className="font-bold text-ink mt-0.5">{selectedQuote.material}</p>
              </div>
            </div>

            {selectedQuote.notes && (
              <div className="bg-paper-dim rounded-sm p-3 border border-line">
                <p className="text-xs font-semibold text-muted uppercase tracking-wide">Specifications Notes:</p>
                <p className="text-ink-soft mt-1 italic">"{selectedQuote.notes}"</p>
              </div>
            )}

            {selectedQuote.fileUrl && (
              <div className="flex items-center gap-3 p-3 bg-paper-dim rounded-sm border border-line">
                <FileType className="h-8 w-8 text-accent shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-ink truncate">{selectedQuote.fileUrl}</p>
                  <p className="text-xs text-muted">{selectedQuote.fileWeight || "Unknown size"} &bull; {selectedQuote.fileType || "PDF / Layout"}</p>
                </div>
              </div>
            )}

            <div className="space-y-2 pt-2">
              <label className="text-sm font-semibold text-ink">Override Estimated Price (NPR)</label>
              <Input
                type="number"
                value={priceOverride}
                onChange={(e) => setPriceOverride(e.target.value)}
                placeholder="NPR 0"
              />
            </div>

            {/* Audit action items */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-line">
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
