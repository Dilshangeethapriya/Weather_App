import { MONTH_STRING_SHORT } from "../data/constants";

// Writing a function to formate the date from timestamp recived from API
function dateTimeFormate(timeStmp) {
  const dateTimeInMilliSeconds = timeStmp * 1000; // seconds to milliseconds (date methodes only work with miliseconds)
  const date = new Date(dateTimeInMilliSeconds);

  const clock12hour = date.getHours() >= 12 ? "pm" : "am"; //  choosing am or pm with ternery oparator
  const formattedHours = date.getHours() % 12 || 12; //  formating hours to 12 hours formate
  const formattedDate =
    formattedHours +
    "." +
    date.getMinutes() +
    clock12hour +
    ",  " +
    MONTH_STRING_SHORT[date.getMonth()] +
    " " +
    date.getDate(); // concat all elements
  return formattedDate;
}

// Writing a function to format the date from timestamp recived from API
function timeFormate(timeStmp) {
  const dateTimeInMilliSeconds = timeStmp * 1000;
  const date = new Date(dateTimeInMilliSeconds);
  const clock12hour = date.getHours() >= 12 ? "pm" : "am";
  const formattedHours = date.getHours() % 12 || 12;
  const formattedtime = formattedHours + "." + date.getMinutes() + clock12hour;
  return formattedtime;
}

export { dateTimeFormate, timeFormate };
