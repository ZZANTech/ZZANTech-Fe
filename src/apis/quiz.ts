export const fetchQuiz = async () => {
  const response = await fetch("/api/quiz");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
