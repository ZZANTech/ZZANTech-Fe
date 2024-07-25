"use client";
import Button from "@/components/Button/Button";
import useKnowhowMutation from "@/stores/queries/useKnowhowMutation";
import Link from "next/link";

type ActionNavProps = {
  knowhowId: number;
};

function ActionNav({ knowhowId }: ActionNavProps) {
  const { removeKnowhow } = useKnowhowMutation();
  const handleDeleteKnowhow = async () => {
    await removeKnowhow(knowhowId);
  };
  return (
    <nav className="flex gap-1">
      <Button href={`/boards/knowhow/edit/${knowhowId}`}>수정</Button>
      <Button onClick={handleDeleteKnowhow}>삭제</Button>
      <Button href="/boards/knowhow">목록으로</Button>
    </nav>
  );
}

export default ActionNav;
