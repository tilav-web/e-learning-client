export const getDayMonthYear = (date: Date) => {
  const day = date?.getDate();
  const month = date ? date.getMonth() + 1 : undefined;
  const year = date?.getFullYear();

  return `${day}-${month}-${year}`;
};
