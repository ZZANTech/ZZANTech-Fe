export const checkLevelName = (total_point: number) => {
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

export const checkLevelImageURL = (total_point: number) => {
  if (total_point < 15) {
    return "/lcons/mypage/lv1.png";
  } else if (total_point > 14 || total_point < 1000) {
    return "/lcons/mypage/lv2.png";
  } else if (total_point > 999 || total_point < 5000) {
    return "/lcons/mypage/lv3.png";
  } else if (total_point > 4999 || total_point < 10000) {
    return "/lcons/mypage/lv4.png";
  } else {
    return "/lcons/mypage/lv5.png";
  }
};
