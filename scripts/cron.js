const schedule = require("node-schedule");
const fs = require("fs");
const path = require("path");

const defaultSaveCron = "*/5 * * * *";
const defaultRconCron = "*/1 * * * *";
/**
 * duplicated implementaion
 */
function getConfig() {
  const baseDir = process.cwd();
  const targetDir = path.join(baseDir, "pa_config");
  try {
    const fileStr = fs.readFileSync(targetDir, "utf-8").split("\n");
    return fileStr
      .map((str) => str.split("="))
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
  } catch (err) {
    console.error(err);
    return {};
  }
}
const config = getConfig();
const { SAVE_SYNC_CRONTAB, RCON_SYNC_CRONTAB, SYNC_TOKEN = "" } = config;

function trimStr(str) {
  return str.replace(/^\"/, "").replace(/\"$/, "");
}

const saveJob = schedule.scheduleJob(
  trimStr(SAVE_SYNC_CRONTAB || defaultSaveCron),
  function () {
    fetch("http://localhost:3000/api/schedule/sync/save", {
      method: "POST",
      headers: {
        __sync_token: SYNC_TOKEN,
      },
    });
  }
);

const rconJob = schedule.scheduleJob(
  trimStr(RCON_SYNC_CRONTAB || defaultRconCron),
  function () {
    fetch("http://localhost:3000/api/schedule/sync/rcon", {
      method: "POST",
      headers: {
        __sync_token: SYNC_TOKEN,
      },
    });
  }
);
