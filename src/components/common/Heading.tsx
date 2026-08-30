import type { ComponentPropsWithoutRef, ElementType } from "react";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type HeadingScale = "page" | "section" | "subsection" | "compact";

type HeadingProps = Omit<ComponentPropsWithoutRef<"h1">, "className"> & {
  as?: HeadingLevel;
  className?: string;
  scale: HeadingScale;
};

export function Heading({
  as = "h2",
  className,
  scale,
  ...props
}: HeadingProps) {
  const Component: ElementType = as;
  const classes = ["heading", className].filter(Boolean).join(" ");

  return <Component {...props} className={classes} data-heading-scale={scale} />;
}
