"use client";

import useAlertModal from "@/hooks/useAlertModal";
import { useModal } from "@/provider/contexts/ModalContext";
import { useUserContext } from "@/provider/contexts/UserContext";
import { useRouter } from "next/navigation";
import useVoteMutation from "@/stores/queries/useVoteMutation";
import { TVote } from "@/types/vote.type";

type ActionNavProps = {
  vote: TVote;
};

function ActionNav({ vote }: ActionNavProps) {
  const { user } = useUserContext();
  const router = useRouter();

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

  const handleNavigate = (url: string) => {
    router.push(url);
  };

  return (
    <div className="justify-start items-center gap-[22px] inline-flex">
      {user?.userId === vote.user_id && (
        <div className="justify-start items-center gap-2 flex">
          <button
            onClick={() => handleNavigate(`/boards/votes/edit/${vote.vote_postId}`)}
            className="text-center text-gray-500 text-sm font-semibold leading-tight"
          >
            수정
          </button>
          <div className="w-px h-3 bg-[#d9d9d9]" />
          <div className="justify-center items-center gap-1 flex">
            <button onClick={handleOpenModal} className="text-center text-gray-500 text-sm font-semibold leading-tight">
              삭제
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => handleNavigate("/boards/votes")}
        className="text-center text-gray-800 text-base font-semibold leading-normal"
      >
        목록으로
      </button>
    </div>
  );
}

export default ActionNav;
