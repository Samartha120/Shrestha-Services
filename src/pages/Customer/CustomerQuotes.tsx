import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useQuoteStore } from "@/store/quoteStore";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/common/Button";
import Dialog from "@/components/ui/Dialog";
import { FileText, FileType } from "lucide-react";
import { Link } from "react-router-dom";

export default function CustomerQuotes() {
  const { user } = useAuthStore();
  const { quotes, fetchQuotesByEmail, isLoading } = useQuoteStore();
  const [filter, setFilter] = useState("all");
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);

  useEffect(() => {
    if (user?.email) {
      fetchQuotesByEmail(user.email);
    }
  }, [user]);

  const filteredQuotes = quotes.filter((q) => {
    if (filter === "all") return true;
    return q.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted">
            <Link to="/my-dashboard" className="hover:underline">Dashboard</Link>
            <span>/</span>
            <span className="text-ink">Quotes</span>
          </div>
          <h1 className="font-display text-2xl tracking-tight text-ink">Your Quote Requests</h1>
          <p className="text-sm text-muted">
            Manage, review, and track custom size printing price calculations.
          </p>
        </div>

        <Link
          to="/quote"
          className="bg-ink hover:bg-accent-hover text-inverse text-sm font-semibold px-4 py-2.5 rounded-full transition-all shrink-0"
        >
          Request Quote
        </Link>
      </div>

      {/* Tabs / Filter Controls */}
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
      <Card className="border border-line rounded-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-sm text-muted">Loading quotes catalog...</div>
        ) : filteredQuotes.length === 0 ? (
          <div className="p-16 text-center text-muted text-sm space-y-2">
            <FileText size={44} className="mx-auto text-faint" />
            <p className="font-semibold text-ink">No quotes found</p>
            <p className="text-xs">There are no quotes matching the category filter "{filter}".</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-paper-dim border-b border-line">
                  <th className="p-4 font-mono uppercase text-xs tracking-wide text-muted">Quote ID</th>
                  <th className="p-4 font-mono uppercase text-xs tracking-wide text-muted">Submitted Date</th>
                  <th className="p-4 font-mono uppercase text-xs tracking-wide text-muted">Dimensions</th>
                  <th className="p-4 font-mono uppercase text-xs tracking-wide text-muted">Material Choice</th>
                  <th className="p-4 font-mono uppercase text-xs tracking-wide text-muted">Estimated Price</th>
                  <th className="p-4 font-mono uppercase text-xs tracking-wide text-muted">Status</th>
                  <th className="p-4 font-mono uppercase text-xs tracking-wide text-muted">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filteredQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-paper-dim">
                    <td className="p-4 font-bold text-ink">{q.id}</td>
                    <td className="p-4 text-muted text-xs">
                      {new Date(q.date).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-medium text-ink-soft">{q.width} x {q.height} ft</td>
                    <td className="p-4 truncate max-w-[160px] text-ink-soft">{q.material}</td>
                    <td className="p-4 font-semibold text-ink">NPR {q.estimatedPrice}</td>
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
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedQuote(q)}
                        className="text-xs font-bold text-accent hover:underline"
                      >
                        Inspect details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <Dialog
          open={!!selectedQuote}
          onClose={() => setSelectedQuote(null)}
          title={`Quote Request Specification - ${selectedQuote.id}`}
        >
          <div className="space-y-6 pt-4 text-sm">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-line">
              <div>
                <p className="text-xs text-muted font-mono uppercase tracking-wide">Calculated Cost</p>
                <p className="text-xl font-bold text-ink mt-1">NPR {selectedQuote.estimatedPrice}</p>
              </div>
              <div>
                <p className="text-xs text-muted font-mono uppercase tracking-wide">Current Status</p>
                <div className="mt-1">
                  <Badge variant={selectedQuote.status === "Approved" ? "success" : selectedQuote.status === "Pending" ? "warning" : "danger"}>
                    {selectedQuote.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-xs font-semibold text-muted">Dimensions</p>
                <p className="font-bold text-ink-soft mt-0.5">{selectedQuote.width} x {selectedQuote.height} feet</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted">Total Area</p>
                <p className="font-bold text-ink-soft mt-0.5">{(selectedQuote.width || 0) * (selectedQuote.height || 0)} sq. ft.</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted">Material Composition</p>
                <p className="font-bold text-ink-soft mt-0.5">{selectedQuote.material}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted">Quantity Required</p>
                <p className="font-bold text-ink-soft mt-0.5">{selectedQuote.quantity || 1} units</p>
              </div>
            </div>

            {selectedQuote.notes && (
              <div className="bg-paper-dim rounded-sm p-3 border border-line">
                <p className="text-xs font-semibold text-muted">Client Specifications Note:</p>
                <p className="text-ink-soft mt-1 italic">"{selectedQuote.notes}"</p>
              </div>
            )}

            {selectedQuote.fileUrl && (
              <div className="flex items-center gap-3 p-3 bg-paper-dim rounded-sm border border-line">
                <FileType className="h-8 w-8 text-accent shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-ink-soft truncate">{selectedQuote.fileUrl}</p>
                  <p className="text-xs text-muted">{selectedQuote.fileWeight || "Unknown size"} &bull; {selectedQuote.fileType || "PDF / Layout"}</p>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4 border-t border-line">
              <Button variant="outline" onClick={() => setSelectedQuote(null)}>
                Close Specifications
              </Button>
            </div>
          </div>
        </Dialog>
      )}

    </div>
  );
}
