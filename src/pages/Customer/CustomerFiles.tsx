import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useQuoteStore } from "@/store/quoteStore";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import {
  Upload,
  FileText,
  Download,
  AlertCircle,
  Trash2,
  FileImage,
  FileCode,
  CheckCircle2,
} from "lucide-react";
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

const getFileIcon = (type: string) => {
  if (type.includes("image")) return FileImage;
  if (type.includes("postscript") || type.includes("pdf") || type.includes("eps")) return FileCode;
  return FileText;
};

const printGuideItems = [
  {
    title: "Color Profile",
    desc: "All banners must use CMYK color profile (not RGB) to ensure correct ink output ratios.",
    color: "blue",
  },
  {
    title: "Resolution Settings",
    desc: "Large flex printing requires minimum 150 DPI. Large banner decals can use 72–100 DPI.",
    color: "indigo",
  },
  {
    title: "Outline Text Fonts",
    desc: "Convert all text to vector outlines (curves) in Illustrator/CorelDraw to avoid missing font errors.",
    color: "violet",
  },
];

const templates = [
  { label: "Standard Roll-up (3×6 ft)", ext: ".AI" },
  { label: "Outdoor Flex Banner (4×8 ft)", ext: ".CDR" },
  { label: "Business Cards (3.5×2 in)", ext: ".PDF" },
  { label: "A4 Flyer Template", ext: ".PDF" },
];

export default function CustomerFiles() {
  const { user } = useAuthStore();
  const { quotes, fetchQuotesByEmail } = useQuoteStore();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (user?.email) {
      fetchQuotesByEmail(user.email);
    }
  }, [user]);

  // Aggregate files from quotes
  useEffect(() => {
    const list: UploadedFile[] = [];
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
    setDeleting(id);
    setTimeout(() => {
      setFiles((prev) => prev.filter((f) => f.id !== id));
      setDeleting(null);
      toast.success("File removed from design drafts.");
    }, 600);
  };

  const handleTemplateDownload = (label: string) => {
    toast.success(`Downloading template: "${label}"`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link to="/dashboard" className="hover:underline hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-100">Design Files</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Design & Template Files</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Upload high-resolution vector artwork (AI, PDF, EPS) for flex printing prepress.
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left — Files List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Active Design Uploads</h3>
            <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full font-semibold">
              {files.length} file{files.length !== 1 ? "s" : ""}
            </span>
          </div>

          <Card className="border border-slate-200/80 dark:border-slate-800 overflow-hidden">
            {files.length === 0 ? (
              <div className="p-16 text-center space-y-3">
                <div className="h-14 w-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mx-auto">
                  <FileText size={24} className="text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm">No files uploaded yet</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Upload files when requesting quotes, or add files directly to your dashboard drafts.
                  </p>
                </div>
                <Button onClick={handleUploadClick} loading={uploading} leftIcon={<Upload size={14} />} className="mx-auto text-xs py-1.5 px-4 h-8">
                  Upload First File
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {files.map((file) => {
                  const Icon = getFileIcon(file.type);
                  const isDeleting = deleting === file.id;
                  return (
                    <div
                      key={file.id}
                      className={`p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-all duration-300 ${
                        isDeleting ? "opacity-40 pointer-events-none" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">{file.name}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                            {file.size} &bull; {file.type} &bull; {new Date(file.uploadedAt).toLocaleDateString()}
                          </p>
                          {file.quoteId && (
                            <span className="inline-block mt-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-0.5 rounded-md">
                              Linked Quote {file.quoteId}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => toast.success(`Downloading "${file.name}"`)}
                          className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-xl transition-colors"
                          title="Download file"
                        >
                          <Download size={15} />
                        </button>
                        <button
                          onClick={() => handleDeleteFile(file.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors"
                          title="Delete file"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        {/* Right — Print Guidelines & Templates */}
        <div className="space-y-6">

          {/* Print Guidelines */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Prepress Print Guide</h3>

            <Card className="border border-slate-200/80 dark:border-slate-800 p-5 space-y-4">
              {printGuideItems.map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="h-7 w-7 rounded-lg bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertCircle size={13} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-800 dark:text-slate-200">{item.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Template Downloads */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Empty Templates</h3>

            <Card className="border border-slate-200/80 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
              {templates.map((tpl, i) => (
                <button
                  key={i}
                  onClick={() => handleTemplateDownload(tpl.label)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">{tpl.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                      {tpl.ext}
                    </span>
                    <Download size={13} className="text-blue-500" />
                  </div>
                </button>
              ))}
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
