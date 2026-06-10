import { useEffect, useState } from "react";
import { useContactStore } from "@/store/contactStore";
import Card from "@/components/ui/Card";
import { Mail, Trash2, Calendar, Phone, User, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function AdminInquiries() {
  const { inquiries, fetchInquiries, deleteInquiry, isLoading } = useContactStore();
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await deleteInquiry(id);
      toast.success("Inquiry deleted successfully");
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    } catch (err) {
      toast.error("Failed to delete inquiry");
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Customer Inquiries</h1>
        <p className="text-sm text-slate-500 mt-1">
          Review general messages, custom printing quotes, and sales consultation requests.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left List Column */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">Inbound Messages</h3>

          <Card className="border border-slate-200/80 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
            {isLoading ? (
              <div className="p-12 text-center text-sm text-slate-500">Retrieving messages...</div>
            ) : inquiries.length === 0 ? (
              <div className="p-16 text-center text-slate-400 text-sm space-y-2">
                <Mail size={40} className="mx-auto text-slate-300" />
                <p className="font-semibold text-slate-700 dark:text-slate-350">No inquiries logged</p>
                <p className="text-xs">Incoming website contact forms will register here.</p>
              </div>
            ) : (
              inquiries.map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => setSelectedInquiry(inq)}
                  className={`p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors ${
                    selectedInquiry?.id === inq.id ? "bg-blue-50/30 dark:bg-blue-950/20" : ""
                  }`}
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">{inq.name}</span>
                      <span className="text-[10px] text-slate-450 dark:text-slate-500 font-mono">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {inq.message}
                    </p>
                  </div>

                  <button
                    onClick={(e) => handleDelete(e, inq.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </Card>
        </div>

        {/* Right Details Panel */}
        <div className="space-y-6">
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">Message Specifications</h3>
          
          {selectedInquiry ? (
            <Card className="border border-slate-200/80 dark:border-slate-800 p-6 space-y-5 text-sm">
              <div className="space-y-3.5 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex gap-2.5 items-center">
                  <User size={16} className="text-slate-450 shrink-0" />
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedInquiry.name}</span>
                </div>
                <div className="flex gap-2.5 items-center">
                  <Mail size={16} className="text-slate-450 shrink-0" />
                  <a href={`mailto:${selectedInquiry.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">{selectedInquiry.email}</a>
                </div>
                <div className="flex gap-2.5 items-center">
                  <Phone size={16} className="text-slate-450 shrink-0" />
                  <span className="font-mono text-slate-600 dark:text-slate-350">{selectedInquiry.phone}</span>
                </div>
                <div className="flex gap-2.5 items-center">
                  <Calendar size={16} className="text-slate-450 shrink-0" />
                  <span className="text-slate-500 text-xs">Received {new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-xs text-slate-450 uppercase tracking-wider">Inquiry message</p>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-150/40 dark:border-slate-800 leading-relaxed text-slate-700 dark:text-slate-300 italic whitespace-pre-wrap">
                  "{selectedInquiry.message}"
                </div>
              </div>
            </Card>
          ) : (
            <Card className="border border-slate-200/80 dark:border-slate-800 p-8 text-center text-slate-400 space-y-2">
              <MessageSquare size={36} className="mx-auto text-slate-300" />
              <p className="text-xs">Select a message from the list to display details and contact options.</p>
            </Card>
          )}
        </div>

      </div>

    </div>
  );
}
