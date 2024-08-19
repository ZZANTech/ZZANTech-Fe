export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const defaultOpenGraph = {
  title: "ZZAN",
  siteName: "ZZAN",
  url: "https://zzan-tech.com",
  description:
    "짠테크 꿀팁을 함께 나누고, 서로의 소비 습관을 재미있게 평가해보세요! 모은 포인트로 기프티콘도 받아가세요!!",
  type: "website",
  images: [
    {
      url: `${BASE_URL}/open_graph_img.png`,
      width: 1200,
      height: 630,
      alt: "ZZAN Open Graph 이미지"
    }
  ]
};
