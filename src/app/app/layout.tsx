"use client";
import styles from "./layout.module.sass";
import cx from "classnames";
import { ConfigProvider, theme } from "antd";
import MotionBackground from "@/components/Motion";
import Menu from "@/components/Menu";
import GlobalHeading from "@/components/GlobalHeading";
import ReturnMark from "@/components/ReturnMark";
import DarkMode, { ThemeContext } from "@/components/DarkMode";
import { useCallback, useState } from "react";
import { useLocalStorageState } from "ahooks";

const { defaultAlgorithm, darkAlgorithm } = theme;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDark = false, setIsDark] = useLocalStorageState<boolean>("theme_is_dark", {
    defaultValue: false,
  });
  const toggle = useCallback(
    (val: boolean) => {
      setIsDark(() => val);
    },
    [setIsDark]
  );
  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      <div
        className={cx(styles.frame, {
          [styles.dark]: isDark,
        })}
      >
        <Menu />
        {/* <MotionBackground /> */}
        <main className="w-full overflow-y-auto">
          <div className="container px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <GlobalHeading />
            <ConfigProvider
              theme={{
                algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
              }}
            >
              {children}
            </ConfigProvider>
          </div>
        </main>
        <ReturnMark />
        <DarkMode />
      </div>
    </ThemeContext.Provider>
  );
}
