import { deleteVoteComment, patchVoteComment, postVoteComment } from "@/apis/votes";
import useAlertModal from "@/hooks/useAlertModal";
import { TResponseStatus } from "@/types/knowhow.type";
import { Tables } from "@/types/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useVoteCommentMutation = () => {
  const { displayDefaultAlert } = useAlertModal();
  const queryClient = useQueryClient();

  const { mutateAsync: addVoteComment } = useMutation<TResponseStatus, Error, Partial<Tables<"vote_comments">>>({
    mutationFn: (updatedComment) => postVoteComment(updatedComment),
    onSuccess: (status, updatedComment) => {
      queryClient.invalidateQueries({
        queryKey: ["voteComments", { voteId: updatedComment.vote_post_id?.toString() }]
      });
    },
    onError: (e) => displayDefaultAlert(e.message)
  });

  const { mutateAsync: updateVoteComment } = useMutation<TResponseStatus, Error, Partial<Tables<"vote_comments">>>({
    mutationFn: (updatedComment) => patchVoteComment(updatedComment),
    onSuccess: (status, updatedComment) => {
      queryClient.invalidateQueries({
        queryKey: ["voteComments", { voteId: updatedComment?.vote_post_id?.toString() }]
      });
    },
    onError: (e) => displayDefaultAlert(e.message)
  });

  const { mutateAsync: removeVoteComment } = useMutation<TResponseStatus, Error, Tables<"vote_comments">>({
    mutationFn: (comment) => deleteVoteComment(comment.vote_commentId),
    onSuccess: (status, comment) => {
      queryClient.invalidateQueries({
        queryKey: ["voteComments", { voteId: comment.vote_post_id.toString() }]
      });
    },
    onError: (e) => displayDefaultAlert(e.message)
  });

  return { addVoteComment, updateVoteComment, removeVoteComment };
};

export default useVoteCommentMutation;
