"use client";

import Button from "@/components/Button/Button";
import useAlertModal from "@/hooks/useAlertModal";
import { useModal } from "@/provider/contexts/ModalContext";
import { useUserContext } from "@/provider/contexts/UserContext";
import useVoteMutation from "@/stores/queries/useVoteMutation";
import { TVote } from "@/types/vote.type";

type ActionNavProps = {
  vote: TVote;
};

function ActionNav({ vote }: ActionNavProps) {
  const { user } = useUserContext();

  const { displayDefaultAlert } = useAlertModal();

  const modal = useModal();
  const { removeVote } = useVoteMutation();

  const handleDeleteVote = async () => {
    try {
      await removeVote(vote.vote_postId);
    } catch (error) {
      displayDefaultAlert("게시글 삭제에 실패했습니다.");
      console.log(error);
      return;
    }
  };

  const handleOpenModal = () =>
    modal.open({
      content: "정말 게시글을 삭제하시겠습니까?",
      type: "confirm",
      onConfirm: handleDeleteVote
    });

  return (
    <nav className="flex gap-1">
      {user?.userId === vote.user_id && (
        <>
          <Button href={`/boards/votes/edit/${vote.vote_postId}`}>수정</Button>
          <Button onClick={handleOpenModal}>삭제</Button>
        </>
      )}
      <Button href="/boards/votes">목록으로</Button>
    </nav>
  );
}

export default ActionNav;
