import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default function convTime(time: number, real_date_time_ticks: number, fileTime: number) {
  const ts = fileTime + (time - real_date_time_ticks) / 1e7;
  const t = dayjs.utc(ts * 1000);
  return t.format("YYYY-MM-DD HH:mm:ss");
}
