import moment from "moment";

export function formatToDisplayDate(seconds: number) {
  return moment.unix(seconds).format("D MMM, YYYY");
}

export function daysSince(seconds: number) {
  const currentTime = moment();
  return currentTime.diff(moment.unix(seconds), "days");
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
