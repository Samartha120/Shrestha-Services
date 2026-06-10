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
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-100">Quotes</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Your Quote Requests</h1>
          <p className="text-sm text-slate-500">
            Manage, review, and track custom size printing price calculations.
          </p>
        </div>

        <Link
          to="/quote"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all shrink-0"
        >
          Request Quote
        </Link>
      </div>

      {/* Tabs / Filter Controls */}
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
          <div className="p-12 text-center text-sm text-slate-500">Loading quotes catalog...</div>
        ) : filteredQuotes.length === 0 ? (
          <div className="p-16 text-center text-slate-450 text-sm space-y-2">
            <FileText size={44} className="mx-auto text-slate-300" />
            <p className="font-semibold text-slate-700 dark:text-slate-300">No quotes found</p>
            <p className="text-xs">There are no quotes matching the category filter "{filter}".</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800">
                  <th className="p-4 font-semibold text-slate-500">Quote ID</th>
                  <th className="p-4 font-semibold text-slate-500">Submitted Date</th>
                  <th className="p-4 font-semibold text-slate-500">Dimensions</th>
                  <th className="p-4 font-semibold text-slate-500">Material Choice</th>
                  <th className="p-4 font-semibold text-slate-500">Estimated Price</th>
                  <th className="p-4 font-semibold text-slate-500">Status</th>
                  <th className="p-4 font-semibold text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-900/30">
                    <td className="p-4 font-bold">{q.id}</td>
                    <td className="p-4 text-slate-500 text-xs">
                      {new Date(q.date).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-medium">{q.width} x {q.height} ft</td>
                    <td className="p-4 truncate max-w-[160px]">{q.material}</td>
                    <td className="p-4 font-semibold text-slate-950 dark:text-white">NPR {q.estimatedPrice}</td>
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
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
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
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Calculated Cost</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">NPR {selectedQuote.estimatedPrice}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Current Status</p>
                <div className="mt-1">
                  <Badge variant={selectedQuote.status === "Approved" ? "success" : selectedQuote.status === "Pending" ? "warning" : "danger"}>
                    {selectedQuote.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-xs font-semibold text-slate-400">Dimensions</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{selectedQuote.width} x {selectedQuote.height} feet</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Total Area</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{(selectedQuote.width || 0) * (selectedQuote.height || 0)} sq. ft.</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Material Composition</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{selectedQuote.material}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Quantity Required</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{selectedQuote.quantity || 1} units</p>
              </div>
            </div>

            {selectedQuote.notes && (
              <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-3 border border-slate-150/40 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-400">Client Specifications Note:</p>
                <p className="text-slate-700 dark:text-slate-300 mt-1 italic">"{selectedQuote.notes}"</p>
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

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
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
