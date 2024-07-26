"use client";

import Button from "@/components/Button/Button";
import { useModal } from "@/provider/contexts/ModalContext";
import useVoteMutation from "@/stores/queries/useVoteMutation";
import { TVote } from "@/types/vote.type";

type ActionNavProps = {
  vote: TVote;
};

function ActionNav({ vote }: ActionNavProps) {
  const modal = useModal();
  const { removeVote } = useVoteMutation();

  const handleDeleteVote = async () => {
    await removeVote(vote.vote_postId);
  };

  const handleOpenModal = () =>
    modal.open({
      content: "정말 게시글을 삭제하시겠습니까?",
      type: "confirm",
      onConfirm: handleDeleteVote
    });

  return (
    <nav className="flex gap-1">
      <Button href={`/boards/votes/edit/${vote.vote_postId}`}>수정</Button>
      <Button onClick={handleOpenModal}>삭제</Button>
      <Button href="/boards/votes">목록으로</Button>
    </nav>
  );
}

export default ActionNav;
