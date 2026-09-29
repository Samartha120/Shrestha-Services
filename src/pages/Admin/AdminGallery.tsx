import { useEffect, useState } from "react";
import { useGalleryStore } from "@/store/galleryStore";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Dialog from "@/components/ui/Dialog";
import { Plus, Trash2, Tag } from "lucide-react";
import { toast } from "sonner";

export default function AdminGallery() {
  const { galleryItems, fetchGalleryItems, createGalleryItem, deleteGalleryItem, isLoading } = useGalleryStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  // Form Fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Signage & Boards");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const openCreateModal = () => {
    setTitle("");
    setCategory("Signage & Boards");
    setDescription("");
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Please fill in all fields.");
      return;
    }

    const payload = {
      title,
      category,
      description,
      image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80",
    };

    try {
      await createGalleryItem(payload);
      toast.success("New gallery item uploaded successfully");
      setModalOpen(false);
    } catch (err) {
      toast.error("Failed to add image to showcase");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this print sample from the gallery?")) return;
    try {
      await deleteGalleryItem(id);
      toast.success("Sample removed successfully");
    } catch (err) {
      toast.error("Failed to delete gallery item");
    }
  };

  const categories = ["all", "Signage & Boards", "Flex & Banner Printing", "Digital & Custom Decals", "Branding & Advertising Solutions"];

  const filteredItems = galleryItems.filter((item) => {
    if (filter === "all") return true;
    return item.category.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl tracking-tight text-ink">Print Work Gallery</h1>
          <p className="text-sm text-muted mt-1">
            Maintain and upload high resolution photos of flex prints and acrylic letters.
          </p>
        </div>

        <Button onClick={openCreateModal} leftIcon={<Plus size={16} />} className="shrink-0">
          Upload Photo
        </Button>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-line pb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3.5 py-2 text-xs font-mono rounded-full transition-all ${
              filter === cat
                ? "bg-ink text-inverse"
                : "text-muted hover:bg-paper-dim"
            }`}
          >
            {cat === "all" ? "All Print Categories" : cat}
          </button>
        ))}
      </div>

      {/* Grid of gallery assets */}
      {isLoading ? (
        <div className="p-12 text-center text-sm text-muted">Retrieving gallery files...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="border border-line rounded-sm overflow-hidden flex flex-col justify-between group">
              <div className="relative h-48 bg-surface-2 overflow-hidden shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-3 left-3 bg-ink/70 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-mono text-inverse tracking-wide flex items-center gap-1.5">
                  <Tag size={10} /> {item.category}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h4 className="font-display text-sm text-ink leading-tight">{item.title}</h4>
                  <p className="text-xs text-muted leading-normal">{item.description}</p>
                </div>

                <div className="flex justify-end pt-3 border-t border-line shrink-0">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-faint hover:text-err hover:bg-accent-soft rounded-sm transition-colors"
                    title="Remove Photo"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Dialogue */}
      {modalOpen && (
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Upload Print Sample Photo"
        >
          <form onSubmit={handleSave} className="space-y-5 pt-4 text-sm">
            <Input
              label="Photo / Spec Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Backlit Golden Mirror Signs"
              required
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-ink">Work Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-sm border border-line bg-surface px-4 py-3 focus:border-accent text-sm focus:outline-none text-ink"
              >
                <option value="Signage & Boards">Signage & Boards</option>
                <option value="Flex & Banner Printing">Flex & Banner Printing</option>
                <option value="Digital & Custom Decals">Digital & Custom Decals</option>
                <option value="Branding & Advertising Solutions">Branding & Advertising Solutions</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-ink">Brief Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What materials, inks, dimensions, or layout settings were used?"
                className="w-full rounded-sm border border-line bg-surface px-4 py-3 min-h-[100px] focus:border-accent text-sm focus:outline-none text-ink placeholder:text-muted"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-line">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Upload Spec Image
              </Button>
            </div>
          </form>
        </Dialog>
      )}

    </div>
  );
}
