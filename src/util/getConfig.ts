import * as fs from "fs";
import * as path from "path";

/**
 * nextjs env management is very annoying, it caches all variables during build time
 * which makes it impossible to set ENV in docker-compose
 * so I'm using this function to get the config from a server-side file.
 */
export default function getConfig(): Record<string, string> {
  const baseDir = process.cwd();
  const targetDir = path.join(baseDir, "pa_config");
  try {
    const fileStr = fs.readFileSync(targetDir, "utf-8").split("\n");
    return fileStr
      .map((str) => str.split("="))
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
  } catch (err) {
    console.error(err);
    return {} as Record<string, string>;
  }
}
