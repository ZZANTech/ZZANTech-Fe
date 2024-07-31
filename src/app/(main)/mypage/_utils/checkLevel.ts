export const checkLevel = (total_point: number) => {
  if (total_point < 15) {
    return "새내기 짠테커";
  } else if (total_point > 14 || total_point < 1000) {
    return "초보 짠테커";
  } else if (total_point > 999 || total_point < 5000) {
    return "고수 짠테커";
  } else if (total_point > 4999 || total_point < 10000) {
    return "마스터 짠테커";
  } else {
    return "슈퍼마스터 짠테커";
  }
};
