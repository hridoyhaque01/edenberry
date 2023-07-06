export default function getIsoDateString(unixTimestamp = "") {
  try {
    const date = new Date(unixTimestamp * 1000);
    const dateString = date.toISOString().split("T")[0];
    return dateString;
  } catch (error) {
    console.log(error);
  }
}
