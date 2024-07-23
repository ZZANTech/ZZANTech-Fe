import { getKnowhowComments, postKnowhow, postKnowhowComment } from "@/apis/knowhow";
import { TKnowhowComment, TResponseStatus } from "@/types/knowhow.type";
import { Tables } from "@/types/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Error from "next/error";

const useKnowhowMutation = () => {
  const { mutateAsync: addKnowhow } = useMutation<TResponseStatus, Error, Partial<Tables<"knowhow_posts">>>({
    mutationFn: (newKnowhow) => postKnowhow(newKnowhow)
  });

  return { addKnowhow };
};

export default useKnowhowMutation;
