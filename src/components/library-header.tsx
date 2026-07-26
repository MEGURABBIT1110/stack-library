import Link from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";

type LibraryHeaderProps = {
  currentPage?: "library" | "bank";
  variant: "library" | "record";
};

export function LibraryHeader({
  currentPage,
  variant,
}: LibraryHeaderProps) {
  return (
    <header className="library-header" data-variant={variant} id="library-masthead">
      <div className="library-header__inner">
        <Link
          aria-label="Stack Libraryの蔵書一覧へ"
          className="library-header__brand"
          href="/"
        >
          <span className="library-header__product-name">Stack Library</span>
        </Link>

        {variant === "library" ? (
          <div className="library-header__controls">
            <nav aria-label="主要ナビゲーション" className="library-header__navigation">
              <Link
                aria-current={currentPage === "library" ? "page" : undefined}
                href="/"
              >
                蔵書一覧
              </Link>
              <Link
                aria-current={currentPage === "bank" ? "page" : undefined}
                href="/bank"
              >
                Library Bank
              </Link>
            </nav>
            <ThemeSwitch />
          </div>
        ) : (
          <ThemeSwitch />
        )}
      </div>
    </header>
  );
}
