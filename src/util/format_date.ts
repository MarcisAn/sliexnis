export default function date(time: any) {
    const months = [
      //lokatīva locījumā
      "janvāris",
      "februāris",
      "marts",
      "aprīlis",
      "maijs",
      "jūnijs",
      "jūlijs",
      "augusts",
      "septembris",
      "oktobris",
      "novembris",
      "decembris",
    ];
    const month = months[time.toDate().getMonth()];
    const date = time.toDate().getDate();
  let hour = time.toDate().getHours();
  //eslint-disable-next-line
    if (hour.toString().length == 1) {
      hour = "0" + hour.toString();
    }
  let minute = time.toDate().getMinutes();
  //eslint-disable-next-line
    if (minute.toString().length == 1) {
      minute = "0" + minute.toString();
    }
    const formatedDate =
      date.toString() + "." + month.toString() + " " + hour + ":" + minute;
    return formatedDate;
  }