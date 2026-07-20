export function ArchiveFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="archive-footer">
      <p className="archive-footer__identity">
        <span aria-hidden="true" />
        STACK LIBRARY
      </p>
      <p>© {currentYear} Meguru Oishi</p>
    </footer>
  );
}
