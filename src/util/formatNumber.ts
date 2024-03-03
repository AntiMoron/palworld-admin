export default function formatNumber(num: string | number) {
  if (typeof num === "undefined" || num === null) {
    return undefined;
  }
  return `${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
