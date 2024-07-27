import Link from "next/link";

function QuizCompletedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="text-3xl font-bold mb-4">오늘의 퀴즈를 이미 풀었습니다!</h1>
      <p className="mb-4">내일 다시 도전하세요!</p>
      <Link href="/" passHref>
        <button className="px-4 py-2 bg-main text-black font-semibold rounded">홈으로 돌아가기</button>
      </Link>
    </div>
  );
}

export default QuizCompletedPage;
