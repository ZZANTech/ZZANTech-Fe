import { deleteKnowhowComment, getKnowhowComments, postKnowhowComment } from "@/apis/knowhow";
import { TKnowhowComment, TResponseStatus } from "@/types/knowhow.type";
import { Tables } from "@/types/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Error from "next/error";

const useKnowhowCommentMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: addKnowhowComment } = useMutation<TResponseStatus, Error, Partial<Tables<"knowhow_comments">>>({
    mutationFn: (newComment) => postKnowhowComment(newComment),
    onSuccess: (status, newComment) => {
      queryClient.invalidateQueries({ queryKey: ["knowhowComments", { knowhowId: newComment.knowhow_post_id }] });
    }
  });

  const { mutateAsync: removeKnowhowComment } = useMutation<
    TResponseStatus,
    Error,
    Tables<"knowhow_comments">["knowhow_commentId"]
  >({
    mutationFn: (commentId) => deleteKnowhowComment(commentId)
  });

  return { addKnowhowComment, removeKnowhowComment };
};

export default useKnowhowCommentMutation;
