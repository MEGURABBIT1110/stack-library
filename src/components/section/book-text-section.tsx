type BookTextSectionProps = {
  heading: string;
  text: string;
  variant: "summary" | "note";
};

export function BookTextSection({ heading, text, variant }: BookTextSectionProps) {
  return (
    <section className={`book-text-section book-text-section--${variant}`}>
      <div className="book-text-section__heading">
        <h2>{heading}</h2>
      </div>
      <div className="book-text-section__body">
        <p>{text}</p>
      </div>
    </section>
  );
}
