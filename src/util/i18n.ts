import cn from "@/locale/cn";
import en from "@/locale/en";
import jp from "@/locale/jp";

const m: any = { cn, en, jp };
let _lang = "en";
let _dict = m[_lang];

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
  const pattern = _dict[key];
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
