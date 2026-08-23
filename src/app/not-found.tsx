import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { LibraryHeader } from "@/components/library-header";

export default function NotFound() {
  return (
    <AppShell
      header={<LibraryHeader variant="record" />}
      variant="message"
    >
      <section className="message-state">
        <h1>技術書が見つかりません</h1>
        <p>指定された蔵書は存在しないか、公開されていません。</p>
        <Link className="text-link" href="/">
          蔵書一覧へ戻る
        </Link>
      </section>
    </AppShell>
  );
}
