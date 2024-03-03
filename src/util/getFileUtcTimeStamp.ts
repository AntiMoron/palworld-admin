import * as fs from "fs";

export default function getFileUtcTimeStamp(filePath: string): number {
  try {
    const stats = fs.statSync(filePath);
    const time = stats.mtime;
    const utcTime = new Date(stats.mtime).toUTCString();
    console.log("UTC Time of the file: " + utcTime);
    return Math.floor(time.getTime() / 1000);
  } catch (err) {
    console.error(err);
  }
  return -1;
}
