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
        <h1 className="font-display text-2xl tracking-tight text-ink">Customer Inquiries</h1>
        <p className="text-sm text-muted mt-1">
          Review general messages, custom printing quotes, and sales consultation requests.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Left — Message List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-ink uppercase tracking-wide">Inbound Messages</h3>
            {inquiries.length > 0 && (
              <span className="text-xs font-semibold text-muted bg-surface-2 px-2.5 py-1 rounded-full">
                {inquiries.length} message{inquiries.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          <Card className="border border-line overflow-hidden">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="h-7 w-7 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                <p className="text-sm text-muted">Retrieving messages...</p>
              </div>
            ) : inquiries.length === 0 ? (
              <div className="p-16 text-center space-y-3">
                <div className="h-14 w-14 rounded-sm bg-surface-2 flex items-center justify-center mx-auto">
                  <Mail size={24} className="text-muted" />
                </div>
                <div>
                  <p className="font-semibold text-ink text-sm">Inbox is empty</p>
                  <p className="text-xs text-muted mt-1">Incoming website contact forms will register here.</p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-line">
                {inquiries.map((inq) => {
                  const isSelected = selectedInquiry?.id === inq.id;
                  return (
                    <div
                      key={inq.id}
                      onClick={() => setSelectedInquiry(inq)}
                      className={`px-5 py-4 flex items-start justify-between gap-4 cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-accent-soft border-l-2 border-accent"
                          : "hover:bg-paper-dim border-l-2 border-transparent"
                      }`}
                    >
                      {/* Avatar + info */}
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="h-9 w-9 rounded-full bg-ink text-inverse font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                          {inq.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-ink">{inq.name}</span>
                            <span className="text-[10px] text-faint font-mono shrink-0">
                              {new Date(inq.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                            </span>
                          </div>
                          <p className="text-xs text-muted truncate leading-relaxed">
                            {inq.message}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleDelete(e, inq.id)}
                        disabled={deletingId === inq.id}
                        className="p-1.5 text-faint hover:text-err hover:bg-surface-2 rounded-sm transition-colors shrink-0 mt-0.5"
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
          <h3 className="font-bold text-sm text-ink uppercase tracking-wide">Message Detail</h3>

          {selectedInquiry ? (
            <Card className="border border-line overflow-hidden">
              {/* Contact info header */}
              <div className="p-5 bg-paper-dim border-b border-line space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-accent text-accent-ink font-bold text-base flex items-center justify-center shrink-0">
                    {selectedInquiry.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-ink text-sm">{selectedInquiry.name}</p>
                    <p className="text-xs text-muted">
                      {new Date(selectedInquiry.createdAt).toLocaleString("en-GB", {
                        day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                      })}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2.5 text-ink-soft">
                    <Mail size={13} className="text-muted shrink-0" />
                    <a href={`mailto:${selectedInquiry.email}`} className="text-accent hover:underline flex items-center gap-1">
                      {selectedInquiry.email}
                      <ExternalLink size={10} />
                    </a>
                  </div>
                  {selectedInquiry.phone && (
                    <div className="flex items-center gap-2.5 text-ink-soft">
                      <Phone size={13} className="text-muted shrink-0" />
                      <span className="font-mono">{selectedInquiry.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Message body */}
              <div className="p-5 space-y-3">
                <p className="font-bold text-xs text-muted uppercase tracking-wide">Message</p>
                <div className="p-4 bg-paper-dim rounded-sm border border-line leading-relaxed text-ink-soft text-sm whitespace-pre-wrap italic">
                  "{selectedInquiry.message}"
                </div>

                {/* Quick reply button */}
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re: Your inquiry via Shrestha Services`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-accent hover:bg-accent-hover text-accent-ink text-xs font-semibold rounded-full transition-colors"
                >
                  <Mail size={13} />
                  Reply via Email
                </a>
              </div>
            </Card>
          ) : (
            <Card className="border border-line p-10 text-center space-y-3">
              <div className="h-12 w-12 rounded-sm bg-surface-2 flex items-center justify-center mx-auto">
                <MessageSquare size={20} className="text-muted" />
              </div>
              <p className="text-xs text-muted">Select a message from the list to view details and contact options.</p>
            </Card>
          )}
        </div>

      </div>
    </div>
  );
}
