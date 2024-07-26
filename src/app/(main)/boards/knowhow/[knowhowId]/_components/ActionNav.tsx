"use client";
import Button from "@/components/Button/Button";
import { useModal } from "@/provider/contexts/modalContext";
import { useUserContext } from "@/provider/contexts/userContext";
import useKnowhowMutation from "@/stores/queries/useKnowhowMutation";
import { TKnowhow } from "@/types/knowhow.type";

type ActionNavProps = {
  knowhow: TKnowhow;
};

function ActionNav({ knowhow }: ActionNavProps) {
  const modal = useModal();
  const { user } = useUserContext();
  const { removeKnowhow } = useKnowhowMutation();
  const handleDeleteKnowhow = async () => {
    await removeKnowhow(knowhow.knowhow_postId);
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
      {user?.userId === knowhow.user_id && (
        <>
          <Button href={`/boards/knowhow/edit/${knowhow.knowhow_postId}`}>수정</Button>
          <Button onClick={handleOpenModal}>삭제</Button>{" "}
        </>
      )}

      <Button href="/boards/knowhow">목록으로</Button>
    </nav>
  );
}

export default ActionNav;
