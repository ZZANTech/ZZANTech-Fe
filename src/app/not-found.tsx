import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100dvh-400px)]">
      <Image src="/logos/404Image.svg" alt="404" width={330} height={150} />
      <h3 className="text-2xl mt-16">요청하신 페이지를 찾을 수 없습니다</h3>
      <Link href="/" passHref>
        <button className="relative flex items-center justify-center px-16 py-5 bg-orange-500 text-black font-bold rounded-full mt-16">
          <span>GO HOME</span>
          <div className="absolute inset-[8px] border-2 border-dashed border-black rounded-full"></div>
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
