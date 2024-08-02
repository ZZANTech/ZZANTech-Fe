"use client";
import Button from "@/components/Button/Button";
import useConfirmModal from "@/hooks/useConfirmModal";
import { useModal } from "@/provider/contexts/ModalContext";
import { useUserContext } from "@/provider/contexts/UserContext";
import useKnowhowMutation from "@/stores/queries/useKnowhowMutation";
import { TKnowhow } from "@/types/knowhow.type";

type ActionNavProps = {
  knowhow: TKnowhow;
};

function ActionNav({ knowhow }: ActionNavProps) {
  const { displayDeleteModal } = useConfirmModal();
  const { user } = useUserContext();
  const { removeKnowhow } = useKnowhowMutation();
  const handleDeleteKnowhow = async () => {
    await removeKnowhow(knowhow.knowhow_postId);
  };

  const handleOpenModal = () => displayDeleteModal(handleDeleteKnowhow);

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
