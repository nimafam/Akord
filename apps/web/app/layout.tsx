import type {
  Metadata,
} from "next";

import {
  ExperienceProvider,
  GraphRuntimeProvider,
  SpatialProjectionProvider,
} from "@/providers";
import { SiteHeader } from "@/components/layout/SiteHeader";

import "./globals.css";

export const metadata: Metadata = {
  applicationName: "AKORD",
  title: {
    default: "AKORD",
    template: "%s | AKORD",
  },
  description:
    "Every Business Deserves a Perfect Composition.",
  openGraph: {
    siteName: "AKORD",
    title: "AKORD",
    description: "Every Business Deserves a Perfect Composition.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <ExperienceProvider>
          <SpatialProjectionProvider>
            <GraphRuntimeProvider>
              {children}
            </GraphRuntimeProvider>
          </SpatialProjectionProvider>
        </ExperienceProvider>
      </body>
    </html>
  );
}
