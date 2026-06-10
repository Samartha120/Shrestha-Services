import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({
  items,
}: Props) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-slate-500">
        {items.map((item, index) => {
          const last = index === items.length - 1;

          return (
            <motion.li
              key={item.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              {last ? (
                <span className="font-medium text-slate-900">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href || "#"}
                  className="hover:text-blue-600"
                >
                  {item.label}
                </Link>
              )}

              {!last && (
                <ChevronRight size={14} />
              )}
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}