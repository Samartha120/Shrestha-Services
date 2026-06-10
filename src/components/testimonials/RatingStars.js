import { jsx as _jsx } from "react/jsx-runtime";
import { Star } from "lucide-react";
export default function RatingStars({ rating, maxRating = 5, size = 20 }) {
    return (_jsx("div", { className: "flex items-center gap-1", children: Array.from({ length: maxRating }, (_, i) => (_jsx(Star, { size: size, className: `${i < rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-slate-300 dark:text-slate-600"}` }, i))) }));
}
