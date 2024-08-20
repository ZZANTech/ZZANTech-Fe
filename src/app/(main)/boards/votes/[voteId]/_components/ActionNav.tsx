"use client";

import useAlertModal from "@/hooks/useAlertModal";
import useConfirmModal from "@/hooks/useConfirmModal";
import { useUserContext } from "@/provider/contexts/UserContext";
import { useRouter } from "next/navigation";
import useVoteMutation from "@/stores/queries/vote/post/useVoteMutation";
import { TVote } from "@/types/vote.type";

type ActionNavProps = {
  vote: TVote;
};

function ActionNav({ vote }: ActionNavProps) {
  const { user } = useUserContext();
  const router = useRouter();
  const { displayDefaultAlert } = useAlertModal();
  const { displayDeleteModal } = useConfirmModal();
  const { removeVote } = useVoteMutation();

  const handleDeleteVote = async () => {
    try {
      await removeVote(vote.vote_postId);
    } catch (error) {
      displayDefaultAlert("게시글 삭제에 실패했습니다.");
      console.log(error);
    }
  };

  const handleNavigate = (url: string) => {
    router.push(url);
  };

  return (
    <div className="flex items-center gap-[22px]">
      {user?.userId === vote.user_id && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNavigate(`/boards/votes/edit/${vote.vote_postId}`)}
            className="text-gray-500 text-sm font-semibold"
          >
            수정
          </button>
          <div className="w-px h-3 bg-[#d9d9d9]" />
          <button onClick={() => displayDeleteModal(handleDeleteVote)} className="text-gray-500 text-sm font-semibold">
            삭제
          </button>
        </div>
      )}
      <button
        onClick={() => handleNavigate("/boards/votes")}
        className="hidden md:block text-gray-800 text-base font-semibold"
      >
        목록으로
      </button>
    </div>
  );
}

export default ActionNav;
