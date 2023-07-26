export default function dateFormater(dateString) {
  console.log(dateString);
  try {
    var unixDate = Math.floor(new Date(dateString).getTime() / 1000);
    return unixDate;
  } catch (error) {
    return null;
  }
}
