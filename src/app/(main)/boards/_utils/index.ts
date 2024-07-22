import dayjs from "dayjs";

export const formatTime = (createdAt: string) => {
  const date = dayjs(createdAt);
  const formattedDate = date.format("YYYY.MM.DD");
  const formattedTime = date.format("HH:mm");
  return { formattedDate, formattedTime };
};
