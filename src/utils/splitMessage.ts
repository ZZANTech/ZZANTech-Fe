export const splitMessage = (message: string): { firstLine: string; secondLine: string } => {
  const splitPoint = "니다";
  const splitIndex = message.indexOf(splitPoint);

  if (splitIndex !== -1) {
    const firstLine = message.substring(0, splitIndex + splitPoint.length);
    const secondLine = message.substring(splitIndex + splitPoint.length);
    return { firstLine, secondLine };
  }
  return { firstLine: message, secondLine: "" };
};
