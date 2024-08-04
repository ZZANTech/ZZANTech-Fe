"use client";
import Button from "@/components/Button/Button";
import useConfirmModal from "@/hooks/useConfirmModal";
import { useModal } from "@/provider/contexts/ModalContext";
import { useUserContext } from "@/provider/contexts/UserContext";
import useKnowhowMutation from "@/stores/queries/knowhow/post/useKnowhowMutation";
import { TKnowhow } from "@/types/knowhow.type";
import Link from "next/link";

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
    <nav className="flex gap-[22px]">
      {user?.userId === knowhow.user_id && (
        <div className="flex gap-2 items-center text-gray-500 font-semibold border-none">
          <Link href={`/boards/knowhow/edit/${knowhow.knowhow_postId}`}>수정</Link>
          <div className="w-px h-3 bg-[#d9d9d9]" />
          <button onClick={handleOpenModal}>삭제</button>
        </div>
      )}

      <Link className="font-semibold text-gray-800" href="/boards/knowhow">
        목록으로
      </Link>
    </nav>
  );
}

export default ActionNav;
