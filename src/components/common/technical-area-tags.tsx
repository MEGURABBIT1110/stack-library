import { TECHNICAL_AREA_LABELS } from "@/lib/books/labels";
import type { TechnicalArea } from "@/types/book";

type TechnicalAreaTagsProps = {
  areas: TechnicalArea[];
};

export function TechnicalAreaTags({ areas }: TechnicalAreaTagsProps) {
  if (areas.length === 0) return null;

  return (
    <ul aria-label="技術分野" className="technical-area-tags">
      {areas.map((area) => (
        <li key={area}>{TECHNICAL_AREA_LABELS[area]}</li>
      ))}
    </ul>
  );
}
