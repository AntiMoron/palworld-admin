import React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Palworld Admin Panel",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
};

export default function Layout(props: any) {
  return (
    <html lang="en">
      <body>{props.children}</body>
    </html>
  );
}
