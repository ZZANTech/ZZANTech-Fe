"use client";
import Button from "@/components/Button/Button";

type ActionNavProps = {
  knowhowId: number;
};

function ActionNav({ knowhowId }: ActionNavProps) {
  return (
    <nav className="flex gap-1">
      <Button href={`/boards/knowhow/edit/${knowhowId}`}>수정</Button>
      <Button>삭제</Button>
      <Button href="/boards/knowhow">목록으로</Button>
    </nav>
  );
}

export default ActionNav;
