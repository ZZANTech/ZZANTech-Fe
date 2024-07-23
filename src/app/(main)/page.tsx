import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>짠테크</h1>
      <Link href="/quiz" passHref>
        <button>퀴즈풀기</button>
      </Link>
    </main>
  );
}
