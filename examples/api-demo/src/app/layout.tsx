import type { Metadata } from "next";
import type { ReactNode } from "react";

import { figtree } from "../fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "addreth",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={figtree.className}>
        {children}
      </body>
    </html>
  );
}
