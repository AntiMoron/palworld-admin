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
  const color = colors[level] as any;
  const newArgs = args.map((item) => {
    if (item && typeof item === "object") {
      try {
        return JSON.stringify(item);
      } catch (err) {
        return (
          "{" +
          Object.keys(item).map((key) => {
            return `${key}: ${item[key]}`;
          }) +
          "}"
        );
      }
    }
    return item;
  });
  if (color) {
    console.log(color?.(PREFIX, ...newArgs));
  } else {
    console.log(PREFIX, ...newArgs);
  }
}
