const ReadableDate = ({ date }) => {
  const dayOfMonth = date.getDate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthOfYear = months[date.getMonth()];
  const year = date.getFullYear();
  const currYear = new Date().getFullYear();

  return (
    <span>
      {monthOfYear} {dayOfMonth}
      {year === currYear ? "" : `, ${year}`}
    </span>
  );
};

export default ReadableDate;
