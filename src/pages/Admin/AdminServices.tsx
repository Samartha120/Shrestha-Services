import { useEffect, useState } from "react";
import { useServiceStore } from "@/store/serviceStore";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Dialog from "@/components/ui/Dialog";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminServices() {
  const { services, fetchServices, createService, updateService, deleteService, isLoading } = useServiceStore();
  const [editingService, setEditingService] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState(0);
  const [materials, setMaterials] = useState("");
  const [features, setFeatures] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setTitle("");
    setSlug("");
    setDescription("");
    setBasePrice(15);
    setMaterials("Normal Flex (280 GSM), Star Flex (340 GSM)");
    setFeatures("Weather Resistant, Vibrant CMYK Colors");
    setModalOpen(true);
  };

  const openEditModal = (s: any) => {
    setEditingService(s);
    setTitle(s.title);
    setSlug(s.slug);
    setDescription(s.description);
    setBasePrice(s.basePrice || 15);
    setMaterials((s.materials || []).join(", "));
    setFeatures((s.features || []).join(", "));
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
      image: editingService?.image || "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80",
      category: editingService?.category || "Flex & Banner Printing",
      basePrice: Number(basePrice),
      materials: materials.split(",").map((x) => x.trim()).filter(Boolean),
      features: features.split(",").map((x) => x.trim()).filter(Boolean),
    };

    try {
      if (editingService) {
        await updateService(editingService.id, payload);
        toast.success("Service updated successfully");
      } else {
        await createService(payload);
        toast.success("New printing service cataloged");
      }
      setModalOpen(false);
    } catch (err) {
      toast.error("Failed to save printing service specifications");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteService(id);
      toast.success("Service deleted successfully");
    } catch (err) {
      toast.error("Failed to delete service from catalog");
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl tracking-tight text-ink">Services Catalog</h1>
          <p className="text-sm text-muted mt-1">
            Manage your digital printing machinery outputs, material pricing options, and specifications.
          </p>
        </div>

        <Button onClick={openCreateModal} leftIcon={<Plus size={16} />} className="shrink-0">
          Add Service Type
        </Button>
      </div>

      {/* Grid of services */}
      {isLoading ? (
        <div className="p-12 text-center text-sm text-muted">Loading catalog...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <Card key={s.id} className="border border-line rounded-sm overflow-hidden flex flex-col justify-between">

              <div className="relative h-44 bg-surface-2 overflow-hidden shrink-0">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 px-2 py-1 bg-ink/70 rounded-sm text-[10px] uppercase font-mono text-inverse tracking-widest">
                  NPR {s.basePrice || 15}/sq.ft
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display text-base text-ink">{s.title}</h3>
                  <p className="text-xs text-muted line-clamp-3">{s.description}</p>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-line shrink-0">
                  <button
                    onClick={() => openEditModal(s)}
                    className="p-2 border border-line rounded-sm hover:bg-paper-dim text-ink-soft transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="p-2 border border-line rounded-sm hover:bg-accent-soft text-err transition-colors"
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
          title={editingService ? `Edit Service - ${editingService.title}` : "Create Printing Service"}
        >
          <form onSubmit={handleSave} className="space-y-5 pt-4 text-sm">
            <Input
              label="Service Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Backlit Flex Board"
              required
            />
            <Input
              label="Slug Identifier (URL)"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. backlit-flex-board"
              required
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-ink">Catalog Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details of print machine outputs, resolution specifications..."
                className="w-full rounded-sm border border-line bg-surface px-4 py-3 min-h-[100px] focus:border-accent text-sm focus:outline-none text-ink placeholder:text-muted"
                required
              />
            </div>

            <Input
              label="Base Price per sq. ft. (NPR)"
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(Number(e.target.value))}
              placeholder="15"
              required
            />

            <Input
              label="Materials (Comma separated list)"
              value={materials}
              onChange={(e) => setMaterials(e.target.value)}
              placeholder="Avery Vinyl, Frosted glass decals..."
            />

            <Input
              label="Features / Key properties (Comma separated)"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="Weather Resistant, Spot UV..."
            />

            <div className="flex justify-end gap-2 pt-4 border-t border-line">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Dialog>
      )}

    </div>
  );
}
