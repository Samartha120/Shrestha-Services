import { User } from "lucide-react";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-24 w-24",
};

export default function Avatar({
  src,
  alt,
  size = "md",
}: AvatarProps) {
  if (!src) {
    return (
      <div
        className={`
        ${sizeMap[size]}
        flex
        items-center
        justify-center
        rounded-full
        bg-slate-200
        `}
      >
        <User size={22} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`
      ${sizeMap[size]}
      rounded-full
      object-cover
      `}
    />
  );
}