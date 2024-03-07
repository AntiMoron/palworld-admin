import React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import LanguageInit from "@/components/Language";
import { setLang } from "@/util/i18n";
import { headers } from "next/headers";

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
  const { children } = props;
  const hs = headers();
  const lang = hs.get("pa_lang") || "";
  setLang(lang);
  return (
    <html lang={lang}>
      <body>
        {children}
        <LanguageInit hidden />
      </body>
    </html>
  );
}
