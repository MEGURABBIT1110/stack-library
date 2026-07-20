type BookTextSectionProps = {
  code: string;
  heading: string;
  text: string;
  variant: "summary" | "note";
};

export function BookTextSection({ code, heading, text, variant }: BookTextSectionProps) {
  return (
    <section className={`book-text-section book-text-section--${variant}`}>
      <div className="book-text-section__heading">
        <p className="section-code">{code}</p>
        <h2>{heading}</h2>
      </div>
      <div className="book-text-section__body">
        <p>{text}</p>
      </div>
    </section>
  );
}
