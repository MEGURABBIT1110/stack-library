"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { BookCover } from "@/components/book-cover";
import { StatusBadge } from "@/components/book-status";
import { ThemeSwitch } from "@/components/theme-switch";
import type { Book } from "@/types/book";

type ContextBook = Pick<
  Book,
  | "authors"
  | "coverImageHeight"
  | "coverImageUrl"
  | "coverImageWidth"
  | "readingStatus"
  | "title"
>;

type ScrollContextBarProps =
  | { kind: "library"; observeId: string }
  | { book: ContextBook; kind: "record"; observeId: string };

export function ScrollContextBar(props: ScrollContextBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(props.observeId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const hasPassedViewportTop = entry.boundingClientRect.bottom <= 0;
        setVisible(!entry.isIntersecting && hasPassedViewportTop);
      },
      { rootMargin: "-1px 0px 0px", threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [props.observeId]);

  return (
    <div
      className={`scroll-context${visible ? " scroll-context--visible" : ""}`}
      data-kind={props.kind}
      inert={!visible}
    >
      <div className="scroll-context__surface">
        {props.kind === "library" ? (
          <Link className="scroll-context__library" href="/">
            <span aria-hidden="true" className="leading-icon-slot">
              <i />
            </span>
            <span>Stack Library</span>
          </Link>
        ) : (
          <>
            <Link aria-label="蔵書一覧へ戻る" className="scroll-context__back" href="/">
              <span aria-hidden="true" className="leading-icon-slot">
                <i className="back-arrow" />
              </span>
              <span className="scroll-context__back-label">蔵書一覧へ</span>
            </Link>
            <div className="scroll-context__record">
              <BookCover book={props.book} decorative variant="context" />
              <div className="scroll-context__record-copy">
                <strong>{props.book.title}</strong>
                <span>{props.book.authors.join("、") || "著者不明"}</span>
              </div>
              <StatusBadge status={props.book.readingStatus} />
            </div>
          </>
        )}
        <div className="scroll-context__theme">
          <ThemeSwitch compact />
        </div>
      </div>
    </div>
  );
}
