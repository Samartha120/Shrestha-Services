import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useQuoteStore } from "@/store/quoteStore";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import { Upload, FileText, Download, AlertCircle, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  quoteId?: string;
  uploadedAt: string;
}

export default function CustomerFiles() {
  const { user } = useAuthStore();
  const { quotes, fetchQuotesByEmail } = useQuoteStore();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetchQuotesByEmail(user.email);
    }
  }, [user]);

  // Aggregate files from quotes + static templates
  useEffect(() => {
    const list: UploadedFile[] = [];
    
    // Extract files from submitted quotes
    quotes.forEach((q) => {
      if (q.fileUrl) {
        list.push({
          id: `file-${q.id}`,
          name: q.fileUrl,
          size: q.fileWeight || "2.1 MB",
          type: q.fileType || "image/jpeg",
          quoteId: q.id,
          uploadedAt: q.date || new Date().toISOString(),
        });
      }
    });

    setFiles(list);
  }, [quotes]);

  const handleUploadClick = () => {
    setUploading(true);
    setTimeout(() => {
      const mockFile: UploadedFile = {
        id: `file-up-${Date.now()}`,
        name: `branding_logo_vector_${Date.now().toString().slice(-4)}.ai`,
        size: "8.4 MB",
        type: "application/postscript",
        uploadedAt: new Date().toISOString(),
      };
      setFiles((prev) => [mockFile, ...prev]);
      setUploading(false);
      toast.success("Design file uploaded successfully.");
    }, 1500);
  };

  const handleDeleteFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    toast.success("File deleted from design drafts.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-100">Design Files</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Design & Template Files</h1>
          <p className="text-sm text-slate-500">
            Upload high-resolution vector artwork files (AI, PDF, EPS) for flex printing prepress.
          </p>
        </div>

        <Button
          onClick={handleUploadClick}
          loading={uploading}
          leftIcon={<Upload size={16} />}
          className="shrink-0"
        >
          Upload Artwork Draft
        </Button>
      </div>

      {/* Grid of panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Files list */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">Active Design Uploads</h3>
          
          <Card className="border border-slate-200/80 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
            {files.length === 0 ? (
              <div className="p-16 text-center text-slate-400 text-sm space-y-2">
                <FileText size={40} className="mx-auto text-slate-300" />
                <p>No layouts or vector files uploaded.</p>
                <p className="text-xs">Upload files when requesting quotes, or add files to your dashboard drafts.</p>
              </div>
            ) : (
              files.map((file) => (
                <div key={file.id} className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 dark:text-slate-100 truncate">{file.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {file.size} &bull; {file.type} &bull; Uploaded {new Date(file.uploadedAt).toLocaleDateString()}
                      </p>
                      {file.quoteId && (
                        <span className="inline-block mt-1 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                          Linked with Quote {file.quoteId}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleDeleteFile(file.id)}
                      className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Delete artwork"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </Card>
        </div>

        {/* Right Column - Print Guidelines */}
        <div className="space-y-6">
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">Prepress Print Guide</h3>
          
          <Card className="border border-slate-200/80 dark:border-slate-800 p-6 space-y-4 text-xs leading-relaxed text-slate-600 dark:text-slate-350">
            <div className="flex gap-2.5 items-start">
              <AlertCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Color Profiles</p>
                <p className="mt-1">All banners must be configured in <strong>CMYK Color Profile</strong> (not RGB) to ensure correct ink output ratios.</p>
              </div>
            </div>

            <div className="flex gap-2.5 items-start">
              <AlertCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Resolution Settings</p>
                <p className="mt-1">For large flex printing, save files at minimum <strong>150 DPI</strong>. Large banner decals can use 72-100 DPI.</p>
              </div>
            </div>

            <div className="flex gap-2.5 items-start">
              <AlertCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Outline Text Fonts</p>
                <p className="mt-1">Convert all text layers to vector outlines (curves) in Adobe Illustrator/CorelDraw to avoid missing font errors.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="font-bold text-slate-850 dark:text-white mb-2 uppercase tracking-wider">Empty Templates</h4>
              <div className="space-y-2">
                <a href="#" className="flex justify-between items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:text-blue-600 dark:hover:text-blue-400">
                  <span>Standard Roll-up (3x6ft)</span>
                  <Download size={14} />
                </a>
                <a href="#" className="flex justify-between items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:text-blue-600 dark:hover:text-blue-400">
                  <span>Business Cards template</span>
                  <Download size={14} />
                </a>
              </div>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
