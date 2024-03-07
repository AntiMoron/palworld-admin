import { exec } from "child_process";
import log from "./log";

export default function runBash(bashCommand: string) {
  return new Promise<string>((res, rej) => {
    log("info", "executing: ", bashCommand);
    exec(bashCommand, (error, stdout, stderr) => {
      if (error) {
        log("error", `Error: ${error.message}`);
        rej(stderr);
        return;
      }
      if (stderr) {
        log("error", `stderr: ${stderr}`);
        rej(stderr);
        return;
      }
      log("info", `stdout: ${stdout}`);
      res(stdout);
    });
  });
}
