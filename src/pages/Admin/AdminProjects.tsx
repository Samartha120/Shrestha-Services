import { useEffect, useState } from "react";
import { useProjectStore } from "@/store/projectStore";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Dialog from "@/components/ui/Dialog";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminProjects() {
  const { projects, fetchProjects, createProject, updateProject, deleteProject, isLoading } = useProjectStore();
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setTitle("");
    setSlug("");
    setDescription("");
    setModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setEditingProject(p);
    setTitle(p.title);
    setSlug(p.slug);
    setDescription(p.description);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const payload = {
      title,
      slug,
      description,
      image: editingProject?.image || "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    };

    try {
      if (editingProject) {
        await updateProject(editingProject.id, payload);
        toast.success("Project updated successfully");
      } else {
        await createProject(payload);
        toast.success("New showcase project created");
      }
      setModalOpen(false);
    } catch (err) {
      toast.error("Failed to save case study project");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    try {
      await deleteProject(id);
      toast.success("Project deleted successfully");
    } catch (err) {
      toast.error("Failed to delete showcase project");
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Case Studies Showcase</h1>
          <p className="text-sm text-slate-500 mt-1">
            Publish and manage branding, signage, and fleet design projects.
          </p>
        </div>

        <Button onClick={openCreateModal} leftIcon={<Plus size={16} />} className="shrink-0">
          Create Case Study
        </Button>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="p-12 text-center text-sm text-slate-500">Retrieving case study database...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <Card key={p.id} className="border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row">
              
              <div className="relative w-full md:w-48 h-48 md:h-auto bg-slate-100 dark:bg-slate-900 shrink-0">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold text-base text-slate-950 dark:text-white leading-snug">{p.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{p.description}</p>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                  <button
                    onClick={() => openEditModal(p)}
                    className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

            </Card>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {modalOpen && (
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingProject ? `Edit Case Study - ${editingProject.title}` : "Add Showcase Case Study"}
        >
          <form onSubmit={handleSave} className="space-y-5 pt-4 text-sm">
            <Input
              label="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Nepal Bank Signage Project"
              required
            />
            <Input
              label="Slug Identifier (URL)"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. nepal-bank-signage"
              required
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Case Details / Highlights</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details of the campaign implementation, dimensions, installation site details..."
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 min-h-[120px] focus:ring-2 focus:ring-blue-500 text-sm focus:outline-none dark:bg-slate-900 dark:border-slate-800 text-slate-900 dark:text-white"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Save Showcase Project
              </Button>
            </div>
          </form>
        </Dialog>
      )}

    </div>
  );
}
