import type { ReactNode } from "react";

type BookShelfProps = {
  children?: ReactNode;
};

export function BookShelf({ children }: BookShelfProps) {
  return (
    <div className="book-shelf__wrapper">
      <div className="book-shelf__surface">{children}</div>
    </div>
  );
}
