import { useEffect, useState } from "react";
import { useContactStore } from "@/store/contactStore";
import Card from "@/components/ui/Card";
import {
  Mail,
  Trash2,
  Phone,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminInquiries() {
  const { inquiries, fetchInquiries, deleteInquiry, isLoading } = useContactStore();
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeletingId(id);
    if (!confirm("Are you sure you want to delete this inquiry?")) {
      setDeletingId(null);
      return;
    }
    try {
      await deleteInquiry(id);
      toast.success("Inquiry deleted successfully");
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    } catch {
      toast.error("Failed to delete inquiry");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Customer Inquiries</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review general messages, custom printing quotes, and sales consultation requests.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Left — Message List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Inbound Messages</h3>
            {inquiries.length > 0 && (
              <span className="text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                {inquiries.length} message{inquiries.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          <Card className="border border-slate-200/80 dark:border-slate-800 overflow-hidden">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="h-7 w-7 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                <p className="text-sm text-slate-500">Retrieving messages...</p>
              </div>
            ) : inquiries.length === 0 ? (
              <div className="p-16 text-center space-y-3">
                <div className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto">
                  <Mail size={24} className="text-slate-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm">Inbox is empty</p>
                  <p className="text-xs text-slate-400 mt-1">Incoming website contact forms will register here.</p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800/70">
                {inquiries.map((inq) => {
                  const isSelected = selectedInquiry?.id === inq.id;
                  return (
                    <div
                      key={inq.id}
                      onClick={() => setSelectedInquiry(inq)}
                      className={`px-5 py-4 flex items-start justify-between gap-4 cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-blue-50/40 dark:bg-blue-950/20 border-l-2 border-blue-500"
                          : "hover:bg-slate-50/50 dark:hover:bg-slate-900/30 border-l-2 border-transparent"
                      }`}
                    >
                      {/* Avatar + info */}
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 dark:from-slate-600 dark:to-slate-800 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                          {inq.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900 dark:text-white">{inq.name}</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono shrink-0">
                              {new Date(inq.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate leading-relaxed">
                            {inq.message}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleDelete(e, inq.id)}
                        disabled={deletingId === inq.id}
                        className="p-1.5 text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors shrink-0 mt-0.5"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        {/* Right — Detail Panel */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Message Detail</h3>

          {selectedInquiry ? (
            <Card className="border border-slate-200/80 dark:border-slate-800 overflow-hidden">
              {/* Contact info header */}
              <div className="p-5 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-base flex items-center justify-center shrink-0">
                    {selectedInquiry.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{selectedInquiry.name}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {new Date(selectedInquiry.createdAt).toLocaleString("en-GB", {
                        day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                      })}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
                    <Mail size={13} className="text-slate-400 shrink-0" />
                    <a href={`mailto:${selectedInquiry.email}`} className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                      {selectedInquiry.email}
                      <ExternalLink size={10} />
                    </a>
                  </div>
                  {selectedInquiry.phone && (
                    <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
                      <Phone size={13} className="text-slate-400 shrink-0" />
                      <span className="font-mono">{selectedInquiry.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Message body */}
              <div className="p-5 space-y-3">
                <p className="font-bold text-xs text-slate-400 uppercase tracking-wider">Message</p>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 leading-relaxed text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap italic">
                  "{selectedInquiry.message}"
                </div>

                {/* Quick reply button */}
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re: Your inquiry via Shrestha Services`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors"
                >
                  <Mail size={13} />
                  Reply via Email
                </a>
              </div>
            </Card>
          ) : (
            <Card className="border border-slate-200/80 dark:border-slate-800 p-10 text-center space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto">
                <MessageSquare size={20} className="text-slate-400" />
              </div>
              <p className="text-xs text-slate-400">Select a message from the list to view details and contact options.</p>
            </Card>
          )}
        </div>

      </div>
    </div>
  );
}
