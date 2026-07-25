import Link from "next/link";

import { LibraryMetrics } from "@/components/library-metrics";
import { ThemeSwitch } from "@/components/theme-switch";
import type { Book } from "@/types/book";

type LibraryHeaderProps = {
  books?: readonly Book[];
  currentPage?: "library" | "bank";
  titleAsHeading?: boolean;
  variant: "library" | "record";
};

export function LibraryHeader({
  books,
  currentPage,
  titleAsHeading = true,
  variant,
}: LibraryHeaderProps) {
  const title = <span className="library-header__title-text">Stack Library</span>;

  return (
    <header className="library-header" data-variant={variant} id="library-masthead">
      <div className="library-header__topline">
        {variant === "library" ? (
          <nav aria-label="主要ナビゲーション" className="library-header__navigation">
            <Link aria-current={currentPage === "library" ? "page" : undefined} href="/">
              Book List
            </Link>
            <Link aria-current={currentPage === "bank" ? "page" : undefined} href="/bank">
              Library Bank
            </Link>
          </nav>
        ) : (
          <Link aria-label="Stack Libraryの蔵書一覧へ" className="library-header__brand" href="/">
            <span aria-hidden="true" />
            Stack Library
          </Link>
        )}
        <ThemeSwitch />
      </div>

      <div className="library-header__body">
        <div className="library-header__introduction">
          {variant === "library" && titleAsHeading ? <h1>{title}</h1> : <p>{title}</p>}
          <p className="library-header__description">
            所有する技術知を、読む状態と実務の文脈から静かに整理する。
          </p>
        </div>
        <LibraryMetrics books={books} />
      </div>
    </header>
  );
}
