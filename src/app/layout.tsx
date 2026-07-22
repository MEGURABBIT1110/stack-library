import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

const siteUrl = "https://stack-library.vercel.app";
const siteTitle = "Stack Library";
const siteDescription = "技術書の蔵書を管理するライブラリ";
const socialImage = "/ogp-center-stage.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: siteTitle,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: `${siteTitle} — ${siteDescription}`,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [socialImage],
  },
};

const themeInitializer = `
  (() => {
    try {
      const stored = localStorage.getItem("stack-library-theme");
      const preferred = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      const theme = stored === "light" || stored === "dark" ? stored : preferred;
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
      const icon = document.getElementById("stack-library-icon");
      if (icon) {
        icon.setAttribute("href", theme === "dark" ? "/icon-dark.svg" : "/icon-light.svg");
      }
    } catch (_) {}
  })();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link
          href="/icon-light.svg"
          id="stack-library-icon"
          rel="icon"
          type="image/svg+xml"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
