import { useEffect, useState } from "react";
import { blogApi, type BlogPost, type BlogPostInput } from "@/services/blogApi";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Dialog from "@/components/ui/Dialog";
import { Plus, Edit2, Trash2, Star, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const emptyForm: BlogPostInput = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  author: "",
  authorBio: "",
  readTime: "",
  image: "",
  featured: false,
  published: true,
};

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<BlogPostInput>(emptyForm);

  const load = async () => {
    setLoading(true);
    try {
      const data = await blogApi.adminGetAll();
      setPosts(data);
    } catch (err) {
      toast.error("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const set = <K extends keyof BlogPostInput>(key: K, value: BlogPostInput[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      authorBio: post.authorBio || "",
      readTime: post.readTime || "",
      image: post.image || "",
      featured: post.featured,
      published: post.published,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.excerpt || !form.content || !form.category || !form.author) {
      toast.error("Title, excerpt, content, category and author are required.");
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await blogApi.update(editing.id, form);
        toast.success("Post updated successfully");
      } else {
        await blogApi.create(form);
        toast.success("Post published successfully");
      }
      setModalOpen(false);
      await load();
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to save blog post";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    try {
      await blogApi.remove(post.id);
      toast.success("Post deleted successfully");
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch (err) {
      toast.error("Failed to delete blog post");
    }
  };

  return (
    <div className="space-y-8">

      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl tracking-tight text-ink">Journal / Blog</h1>
          <p className="text-sm text-muted mt-1">
            Write, edit and publish articles shown on the public journal.
          </p>
        </div>
        <Button onClick={openCreate} leftIcon={<Plus size={16} />} className="shrink-0">
          New Post
        </Button>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="h-7 w-7 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          <p className="text-sm text-muted">Retrieving posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <Card className="border border-line p-16 text-center space-y-2">
          <p className="font-semibold text-ink text-sm">No posts yet</p>
          <p className="text-xs text-muted">Create your first article to populate the journal.</p>
        </Card>
      ) : (
        <Card className="border border-line overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-paper-dim border-b border-line">
                  <th className="p-4 font-mono text-muted uppercase tracking-wide text-[10px]">Title</th>
                  <th className="p-4 font-mono text-muted uppercase tracking-wide text-[10px]">Category</th>
                  <th className="p-4 font-mono text-muted uppercase tracking-wide text-[10px]">Author</th>
                  <th className="p-4 font-mono text-muted uppercase tracking-wide text-[10px]">Status</th>
                  <th className="p-4 font-mono text-muted uppercase tracking-wide text-[10px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-paper-dim transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {post.featured && <Star size={13} className="text-accent shrink-0" fill="currentColor" />}
                        <span className="font-medium text-ink">{post.title}</span>
                      </div>
                      <span className="text-[11px] font-mono text-faint">/{post.slug}</span>
                    </td>
                    <td className="p-4 text-ink-soft">{post.category}</td>
                    <td className="p-4 text-ink-soft">{post.author}</td>
                    <td className="p-4">
                      {post.published ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-ok">
                          <Eye size={12} /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted">
                          <EyeOff size={12} /> Draft
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(post)}
                          className="p-2 border border-line rounded-sm hover:bg-surface-2 text-ink-soft transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(post)}
                          className="p-2 border border-line rounded-sm hover:bg-accent-soft text-err transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Editor Modal */}
      {modalOpen && (
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editing ? `Edit Post — ${editing.title}` : "New Blog Post"}
        >
          <form onSubmit={handleSave} className="space-y-5 pt-4 text-sm">
            <Input
              label="Title"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Why Print Quality Matters"
              required
            />
            <Input
              label="Slug (optional — generated from title if blank)"
              value={form.slug || ""}
              onChange={(e) => set("slug", e.target.value)}
              placeholder="why-print-quality-matters"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Category"
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                placeholder="Printing Tips"
                required
              />
              <Input
                label="Author"
                value={form.author}
                onChange={(e) => set("author", e.target.value)}
                placeholder="Raj Shrestha"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Read Time"
                value={form.readTime || ""}
                onChange={(e) => set("readTime", e.target.value)}
                placeholder="5 min"
              />
              <Input
                label="Image URL"
                value={form.image || ""}
                onChange={(e) => set("image", e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-ink">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                placeholder="Short summary shown in the article list..."
                className="w-full rounded-sm border border-line bg-surface px-4 py-3 min-h-[70px] focus:border-accent text-sm focus:outline-none text-ink placeholder:text-muted"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-ink">Author Bio</label>
              <textarea
                value={form.authorBio || ""}
                onChange={(e) => set("authorBio", e.target.value)}
                placeholder="One line about the author..."
                className="w-full rounded-sm border border-line bg-surface px-4 py-3 min-h-[60px] focus:border-accent text-sm focus:outline-none text-ink placeholder:text-muted"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-ink">Content</label>
              <textarea
                value={form.content}
                onChange={(e) => set("content", e.target.value)}
                placeholder="Full article body. Separate paragraphs with a blank line; short standalone lines become headings."
                className="w-full rounded-sm border border-line bg-surface px-4 py-3 min-h-[220px] focus:border-accent text-sm focus:outline-none text-ink placeholder:text-muted"
                required
              />
            </div>

            <div className="flex flex-wrap gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-ink-soft">
                <input
                  type="checkbox"
                  checked={!!form.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                  className="accent-[var(--color-accent)]"
                />
                Featured post
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-ink-soft">
                <input
                  type="checkbox"
                  checked={form.published !== false}
                  onChange={(e) => set("published", e.target.checked)}
                  className="accent-[var(--color-accent)]"
                />
                Published
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-line">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" loading={saving}>
                {editing ? "Save Changes" : "Publish Post"}
              </Button>
            </div>
          </form>
        </Dialog>
      )}

    </div>
  );
}
