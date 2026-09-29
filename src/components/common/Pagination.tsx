interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`h-10 w-10 rounded-full text-sm font-medium transition-colors ${
            page === index + 1
              ? "bg-ink text-inverse"
              : "border border-line text-ink-soft hover:border-line-strong hover:bg-paper-dim"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
