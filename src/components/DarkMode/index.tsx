"use client";
import React, { useContext, useEffect, useMemo } from "react";
import { FloatButton } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import styles from "./index.module.sass";

export const ThemeContext = React.createContext({
  isDark: false,
  toggle: (toMode: boolean) => {},
});

export default function DarkMode() {
  const { isDark, toggle } = useContext(ThemeContext);
  useEffect(() => {
    toggle(
      window.matchMedia("(prefers-color-scheme: dark)").matches ? true : false
    );
  }, []);
  useEffect(() => {
    if (document) {
      const html = document.querySelector("html");
      if (html) {
        html.setAttribute("data-theme", isDark ? "dark" : "light");
      }
    }
    if (isDark) {
      document.body.classList.add("nightwind");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("nightwind");
      document.body.classList.remove("dark");
      
    }
  }, [isDark]);
  return (
    <FloatButton
      icon={isDark ? <SunOutlined /> : <MoonOutlined />}
      style={{ bottom: 100 }}
      onClick={() => {
        toggle(!isDark);
      }}
    />
  );
}
