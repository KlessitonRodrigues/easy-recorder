export const dateFormat = (date?: Date) => {
  const newDate = date || new Date();
  return `-${newDate.getFullYear()}${(newDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${newDate.getDate().toString().padStart(2, "0")}-${newDate
    .getHours()
    .toString()
    .padStart(
      2,
      "0"
    )}${newDate.getMinutes().toString().padStart(2, "0")}${newDate
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
};
