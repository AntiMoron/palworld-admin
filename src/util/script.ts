import { exec } from "child_process";

export default function runBash(bashCommand: string) {
  return new Promise<string>((res, rej) => {
    console.log("executing: ", bashCommand);
    exec(bashCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        rej(stderr);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        rej(stderr);
        return;
      }
      console.log(`stdout: ${stdout}`);
      res(stdout);
    });
  });
}
