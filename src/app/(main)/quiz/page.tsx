import QuizContainer from "./_components/QuizContainer";
import QuizModal from "./_components/QuizModal";

const QuizPage = async () => {
  return (
    <QuizModal>
      <QuizContainer />
    </QuizModal>
  );
};

export default QuizPage;
