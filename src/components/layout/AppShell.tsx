import type { ReactNode } from "react";

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
      <footer className="archive-footer">
        <p className="archive-footer__identity">
          <span aria-hidden="true" />
          Stack Library
        </p>
      </footer>
    </div>
  );
}
