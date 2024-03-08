import cn from "@/locale/cn";
import en from "@/locale/en";
import jp from "@/locale/jp";
import cnPal from "@/locale/pal_name/cn";
import enPal from "@/locale/pal_name/en";
import jpPal from "@/locale/pal_name/en";
import get from "lodash/get";

const m: any = {
  cn: { ...cn, pal: cnPal },
  en: { ...en, pal: enPal },
  jp: { ...jp, pal: jpPal },
};

let _lang = "en";
let _dict = m[_lang];

export function getLang() {
  return _lang;
}

export function setLang(lang: string) {
  _lang = lang;
  switch (lang) {
    case "en":
    case "en-US":
    case "en_US":
    case "en-UK":
    case "en_UK":
      _dict = m["en"];
      break;
    case "zh-CN":
    case "zh_CN":
    case "cn":
    case "zh":
      _dict = m["cn"];
      break;
    case "jp":
    case "ja":
    case "ja-JP":
    case "ja_JP":
      _dict = m["jp"];
      break;
    default:
      _dict = m["en"];
      break;
  }
}

export default function i18n(
  key: string,
  values?: Record<string, string | number | boolean>
): string {
  const pattern = get(_dict, key);
  if (!pattern) {
    return key;
  }
  const placeholders: string[] | null = pattern.match(/\{[a-zA-Z0-9_]+\}/g);
  if (!placeholders || !values) {
    return pattern;
  }
  let result = pattern;
  placeholders.forEach((placeholder: string) => {
    const key = placeholder.slice(1, -1);
    const value = values[key];
    result = result.replace(placeholder, value);
  });
  return result;
}
