import { deleteKnowhowComment, getKnowhowComments, patchKnowhowComment, postKnowhowComment } from "@/apis/knowhow";
import useErrorModal from "@/hooks/useErrorModal";
import { TKnowhowComment, TResponseStatus } from "@/types/knowhow.type";
import { Tables } from "@/types/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useKnowhowCommentMutation = () => {
  const displayCommentError = useErrorModal();
  const queryClient = useQueryClient();
  const { mutateAsync: addKnowhowComment } = useMutation<TResponseStatus, Error, Partial<Tables<"knowhow_comments">>>({
    mutationFn: (updatedComment) => postKnowhowComment(updatedComment),
    onSuccess: (status, updatedComment) => {
      queryClient.invalidateQueries({
        queryKey: ["knowhowComments", { knowhowId: updatedComment.knowhow_post_id?.toString() }]
      });
    },
    onError: (e) => displayCommentError(e.message)
  });

  const { mutateAsync: updateKnowhowComment } = useMutation<
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
    onError: (e) => displayCommentError(e.message)
  });

  const { mutateAsync: removeKnowhowComment } = useMutation<TResponseStatus, Error, Tables<"knowhow_comments">>({
    mutationFn: (comment) => deleteKnowhowComment(comment.knowhow_commentId),
    onSuccess: (status, comment) => {
      queryClient.invalidateQueries({
        queryKey: ["knowhowComments", { knowhowId: comment.knowhow_post_id.toString() }]
      });
    },
    onError: (e) => displayCommentError(e.message)
  });
  return { addKnowhowComment, updateKnowhowComment, removeKnowhowComment };
};

export default useKnowhowCommentMutation;
