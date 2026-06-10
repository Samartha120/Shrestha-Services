import { useEffect, useState } from "react";
import { useTestimonialStore } from "@/store/testimonialStore";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Dialog from "@/components/ui/Dialog";
import { Plus, Trash2, Star } from "lucide-react";
import { toast } from "sonner";

export default function AdminTestimonials() {
  const { testimonials, fetchTestimonials, addTestimonial, deleteTestimonial, isLoading } = useTestimonialStore();
  const [modalOpen, setModalOpen] = useState(false);

  // Form Fields
  const [customerName, setCustomerName] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreateModal = () => {
    setCustomerName("");
    setRating(5);
    setReview("");
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !review) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await addTestimonial({
        customerName,
        rating: Number(rating),
        review,
      });
      toast.success("New customer feedback added");
      setModalOpen(false);
    } catch (err) {
      toast.error("Failed to add testimonial");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this review from the public website?")) return;
    try {
      await deleteTestimonial(id);
      toast.success("Testimonial removed successfully");
    } catch (err) {
      toast.error("Failed to delete review");
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Customer Reviews</h1>
          <p className="text-sm text-slate-500 mt-1">
            Review and publish client stories, event feedback, and star ratings.
          </p>
        </div>

        <Button onClick={openCreateModal} leftIcon={<Plus size={16} />} className="shrink-0">
          Add Testimonial
        </Button>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="p-12 text-center text-sm text-slate-500">Loading reviews...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.id} className="border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between space-y-4">
              
              <div className="space-y-3">
                {/* Rating stars */}
                <div className="flex gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      fill={idx < t.rating ? "currentColor" : "none"}
                      className={idx < t.rating ? "text-amber-500" : "text-slate-300 dark:text-slate-700"}
                    />
                  ))}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed italic">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
                <span className="font-bold text-xs text-slate-900 dark:text-white truncate max-w-[150px]">
                  {t.customerName}
                </span>

                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-1.5 text-slate-450 hover:text-red-500 hover:bg-red-55/20 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                  title="Delete Review"
                >
                  <Trash2 size={15} />
                </button>
              </div>

            </Card>
          ))}
        </div>
      )}

      {/* Add Review Dialog */}
      {modalOpen && (
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Add Customer Testimonial"
        >
          <form onSubmit={handleSave} className="space-y-5 pt-4 text-sm">
            <Input
              label="Customer / Representative Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Ramesh Thapa (Brand Manager)"
              required
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Rating Stars (1-5)</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:ring-2 focus:ring-blue-500 text-sm focus:outline-none dark:bg-slate-900 dark:border-slate-800 text-slate-900 dark:text-white"
              >
                <option value={5}>5 Stars (Excellent)</option>
                <option value={4}>4 Stars (Good)</option>
                <option value={3}>3 Stars (Average)</option>
                <option value={2}>2 Stars (Fair)</option>
                <option value={1}>1 Star (Poor)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Review Message</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write the customer's comment details here..."
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 min-h-[100px] focus:ring-2 focus:ring-blue-500 text-sm focus:outline-none dark:bg-slate-900 dark:border-slate-800 text-slate-900 dark:text-white"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Submit Review
              </Button>
            </div>
          </form>
        </Dialog>
      )}

    </div>
  );
}
