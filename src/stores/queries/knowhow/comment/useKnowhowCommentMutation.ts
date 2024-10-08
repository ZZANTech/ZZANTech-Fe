import { deleteKnowhowComment, patchKnowhowComment, postKnowhowComment } from "@/apis/knowhow";
import useAlertModal from "@/hooks/useAlertModal";
import { DEFAULT_KNOWHOWS_QUERY_KEY } from "@/stores/queries/knowhow/post/useKnowhowMutation";
import { TResponseStatus } from "@/types/knowhow.type";
import { Tables } from "@/types/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useKnowhowCommentMutation = () => {
  const { displayDefaultAlert } = useAlertModal();
  const queryClient = useQueryClient();
  const { mutateAsync: addKnowhowComment, isPending: isKnowhowCommentPostPending } = useMutation<
    TResponseStatus,
    Error,
    Partial<Tables<"knowhow_comments">>
  >({
    mutationFn: (updatedComment) => postKnowhowComment(updatedComment),
    onSuccess: (status, updatedComment) => {
      queryClient.invalidateQueries({
        queryKey: ["knowhowComments", { knowhowId: updatedComment.knowhow_post_id?.toString() }]
      });
      queryClient.invalidateQueries({
        queryKey: DEFAULT_KNOWHOWS_QUERY_KEY
      });
    },
    onError: (e) => displayDefaultAlert(e.message)
  });

  const { mutateAsync: updateKnowhowComment, isPending: isKnowhowCommentPatchPending } = useMutation<
    TResponseStatus,
    Error,
    Partial<Tables<"knowhow_comments">>
  >({
    mutationFn: (updatedComment) => patchKnowhowComment(updatedComment),
    onSuccess: (status, updatedComment) => {
      queryClient.invalidateQueries({
        queryKey: ["knowhowComments", { knowhowId: updatedComment?.knowhow_post_id?.toString() }]
      });
    },
    onError: (e) => displayDefaultAlert(e.message)
  });

  const { mutateAsync: removeKnowhowComment } = useMutation<TResponseStatus, Error, Tables<"knowhow_comments">>({
    mutationFn: (comment) => deleteKnowhowComment(comment.knowhow_commentId),
    onSuccess: (status, comment) => {
      queryClient.invalidateQueries({
        queryKey: ["knowhowComments", { knowhowId: comment.knowhow_post_id.toString() }]
      });
    },
    onError: (e) => displayDefaultAlert(e.message)
  });
  return {
    addKnowhowComment,
    isKnowhowCommentPostPending,
    updateKnowhowComment,
    isKnowhowCommentPatchPending,
    removeKnowhowComment
  };
};

export default useKnowhowCommentMutation;
