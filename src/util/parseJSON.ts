import log from "./log";

export default function parseJSON<T = any>(param: string): T | undefined {
  try {
    return JSON.parse(param) as unknown as T;
  } catch (err) {
    log("error", err);
    log("error", "|||\n", param, "|||");
    return undefined;
  }
}
