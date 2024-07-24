import { deleteKnowhowComment, getKnowhowComments, patchKnowhowComment, postKnowhowComment } from "@/apis/knowhow";
import { TKnowhowComment, TResponseStatus } from "@/types/knowhow.type";
import { Tables } from "@/types/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Error from "next/error";

const useKnowhowCommentMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: addKnowhowComment } = useMutation<TResponseStatus, Error, Partial<Tables<"knowhow_comments">>>({
    mutationFn: (updatedComment) => postKnowhowComment(updatedComment),
    onSuccess: (status, updatedComment) => {
      queryClient.invalidateQueries({
        queryKey: ["knowhowComments", { knowhowId: updatedComment.knowhow_post_id?.toString() }]
      });
    }
  });

  const { mutateAsync: updateKnowhowComment } = useMutation<
    TResponseStatus,
    Error,
    Partial<Tables<"knowhow_comments">>
  >({
    mutationFn: (updatedComment) => patchKnowhowComment(updatedComment),
    onSuccess: (status, updatedComment) => {
      console.log(updatedComment?.knowhow_post_id?.toString());
      queryClient.invalidateQueries({
        queryKey: ["knowhowComments", { knowhowId: updatedComment?.knowhow_post_id?.toString() }]
      });
    }
  });

  const { mutateAsync: removeKnowhowComment } = useMutation<TResponseStatus, Error, Tables<"knowhow_comments">>({
    mutationFn: (comment) => deleteKnowhowComment(comment.knowhow_commentId),
    onSuccess: (status, comment) => {
      console.log(comment.knowhow_post_id);
      queryClient.invalidateQueries({
        queryKey: ["knowhowComments", { knowhowId: comment.knowhow_post_id.toString() }]
      });
    }
  });
  return { addKnowhowComment, updateKnowhowComment, removeKnowhowComment };
};

export default useKnowhowCommentMutation;
