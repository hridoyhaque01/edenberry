export default function getIsoDateString(unixTimestamp = "") {
  const date = new Date(unixTimestamp * 1000);
  const dateString = date.toISOString().split("T")[0];
  return dateString;
}
