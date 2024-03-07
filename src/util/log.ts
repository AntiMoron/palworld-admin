import dayjs from "dayjs";
import chalk from "chalk";

const colors = {
  info: undefined,
  error: chalk.red,
  debug: chalk.gray,
};

export default function log(level: "info" | "error" | "debug", ...args: any[]) {
  if (!process.env.DEV && level === "debug") {
    return;
  }
  const PREFIX = `[${level} <${dayjs().format("MMM-DD HH:mm:ss")}>] `;
  console.log(PREFIX, ...args);
  const color = colors[level] as any;
  if (color) {
    console.log(color?.(PREFIX, ...args));
  } else {
    console.log(PREFIX, ...args);
  }
}
