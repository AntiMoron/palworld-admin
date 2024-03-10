import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import log from "./log";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function convTime(time: number, real_date_time_ticks: number, fileTime: number) {
  log('debug', 'convTime', time, real_date_time_ticks, fileTime);
  const ts = fileTime + (time - real_date_time_ticks) / 1e7;
  const t = dayjs.utc(ts * 1000);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return t.tz(timeZone).format("YYYY-MM-DD HH:mm:ss");
}
