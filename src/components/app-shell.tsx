import type { ReactNode } from "react";

import { ArchiveFooter } from "@/components/archive-footer";

type AppShellProps = {
  children: ReactNode;
  contextBar?: ReactNode;
  header: ReactNode;
  variant: "library" | "record" | "message";
};

export function AppShell({ children, contextBar, header, variant }: AppShellProps) {
  return (
    <div className="app-shell" data-page={variant}>
      <div className="app-shell__header">
        {header}
        {contextBar}
      </div>
      <main className="app-shell__main">{children}</main>
      <ArchiveFooter />
    </div>
  );
}
