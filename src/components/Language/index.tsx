"use client";
import React, { useEffect } from "react";
import { useLocalStorageState } from "ahooks";
import { Select } from "antd";
import { setLang as setSysLang } from "@/util/i18n";
import cx from "classnames";

interface Props {
  hidden?: boolean;
  className?: string;
}

export default function Language(props: Props) {
  const { hidden, className } = props;
  const [lang, setLang] = useLocalStorageState<string>("pa_lang", {
    defaultValue: "",
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    if (searchParams.has("lang")) {
      setLang(searchParams.get("lang") as string);
    } else if (lang) {
      // also add url search param to change language
      searchParams.set("lang", lang);
      url.search = searchParams.toString();
      window.history.replaceState({}, "", url.toString());
    } else {
      const browserLang = navigator.language;
      if (!lang) {
        setLang(browserLang);
      }
    }
  }, []);
  useEffect(() => {
    setSysLang(lang as any);
  }, [lang]);
  if (hidden) {
    return null;
  }
  return (
    <Select
      className={cx("", className)}
      onChange={(value) => {
        setLang(value);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }}
      value={lang}
      options={[
        { label: "English", value: "en", title: "English" },
        { label: "日本語", value: "ja", title: "日本語" },
        { label: "简体中文", value: "zh", title: "简体中文" },
      ]}
    ></Select>
  );
}
