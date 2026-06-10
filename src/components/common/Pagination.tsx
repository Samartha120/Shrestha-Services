interface Props {
  page: number;
  totalPages: number;
  onPageChange: (
    page: number
  ) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div
      className="
      flex
      items-center
      justify-center
      gap-2
      "
    >
      <button
        disabled={page === 1}
        onClick={() =>
          onPageChange(page - 1)
        }
      >
        Prev
      </button>

      {Array.from({
        length: totalPages,
      }).map((_, index) => (
        <button
          key={index}
          onClick={() =>
            onPageChange(
              index + 1
            )
          }
          className={`
          h-10
          w-10
          rounded-lg
          ${
            page === index + 1
              ? "bg-blue-600 text-white"
              : "border"
          }
          `}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={
          page === totalPages
        }
        onClick={() =>
          onPageChange(page + 1)
        }
      >
        Next
      </button>
    </div>
  );
}