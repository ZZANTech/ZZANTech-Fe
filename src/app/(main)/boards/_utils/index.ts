import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatTime = (createdAt: string) => {
  const date = dayjs(createdAt).tz("Asia/Seoul");
  const formattedDate = date.format("YYYY.MM.DD");
  const formattedTime = date.format("HH:mm");
  return { formattedDate, formattedTime };
};

export const formatNumberWithCommas = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
