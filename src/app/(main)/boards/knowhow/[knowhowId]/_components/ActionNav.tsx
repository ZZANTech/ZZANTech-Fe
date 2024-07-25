"use client";
import Button from "@/components/Button/Button";
import { useModal } from "@/provider/contexts/modalContext";
import useKnowhowMutation from "@/stores/queries/useKnowhowMutation";

type ActionNavProps = {
  knowhowId: number;
};

function ActionNav({ knowhowId }: ActionNavProps) {
  const modal = useModal();
  const { removeKnowhow } = useKnowhowMutation();
  const handleDeleteKnowhow = async () => {
    await removeKnowhow(knowhowId);
  };

  const handleOpenModal = () =>
    modal.open({
      content: "게시글을 삭제하시겠습니까?",
      subContent: "qwdq",
      type: "confirm",
      onConfirm: handleDeleteKnowhow
    });

  return (
    <nav className="flex gap-1">
      <Button href={`/boards/knowhow/edit/${knowhowId}`}>수정</Button>
      <Button onClick={handleOpenModal}>삭제</Button>
      <Button href="/boards/knowhow">목록으로</Button>
    </nav>
  );
}

export default ActionNav;
