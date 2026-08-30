import { READING_STATUS_LABELS } from "@/lib/books/labels";
import type { ReadingStatus } from "@/types/book";

type StatusBadgeProps = {
  status: ReadingStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="status-badge" data-status={status}>
      {READING_STATUS_LABELS[status]}
    </span>
  );
}
