import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const NOTES_PAGE_SIZE = 6;

interface NotesPaginationProps {
  page: number;
  pageSize?: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function NotesPagination({
  page,
  pageSize = NOTES_PAGE_SIZE,
  total,
  onPageChange,
}: NotesPaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(page, pageCount);
  const start = total === 0 ? 0 : (current - 1) * pageSize + 1;
  const end = Math.min(current * pageSize, total);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
      <p className="text-sm text-[#64748B]">
        Showing {start}-{end} of {total} notes
      </p>

      <nav className="flex items-center gap-1" aria-label="Notes pages">
        <PageButton
          label="Previous page"
          disabled={current === 1}
          onClick={() => onPageChange(current - 1)}
        >
          <ChevronLeft className="size-4" />
        </PageButton>

        {Array.from({ length: pageCount }, (_, index) => index + 1).map(
          (pageNumber) => {
            const selected = pageNumber === current;

            return (
              <button
                key={pageNumber}
                type="button"
                aria-label={`Page ${pageNumber}`}
                aria-current={selected ? "page" : undefined}
                onClick={() => onPageChange(pageNumber)}
                className={`flex size-8 items-center justify-center rounded-lg text-sm font-semibold transition ${
                  selected
                    ? "bg-[#0866F5] text-white shadow-sm"
                    : "text-[#344563] hover:bg-white"
                }`}
              >
                {pageNumber}
              </button>
            );
          },
        )}

        <PageButton
          label="Next page"
          disabled={current === pageCount}
          onClick={() => onPageChange(current + 1)}
        >
          <ChevronRight className="size-4" />
        </PageButton>
      </nav>
    </div>
  );
}

function PageButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-8 items-center justify-center rounded-lg text-[#64748B] transition hover:bg-white disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  );
}
