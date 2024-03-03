import React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Palworld Admin Panel",
};

export default function Layout(props: any) {
  return (
    <html lang="en">
      <body>{props.children}</body>
    </html>
  );
}
