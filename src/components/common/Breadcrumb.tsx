import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: Props) {
  const reduce = useReducedMotion();

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-muted">
        {items.map((item, index) => {
          const last = index === items.length - 1;

          return (
            <motion.li
              key={item.label}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              {last ? (
                <span className="font-medium text-ink">{item.label}</span>
              ) : (
                <Link
                  to={item.href || "#"}
                  className="transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              )}

              {!last && (
                <ChevronRight size={14} className="text-faint" />
              )}
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}
