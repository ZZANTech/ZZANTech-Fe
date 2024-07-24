import { SORT_LATEST, SEARCH_TITLECONTENT } from "@/app/(main)/boards/knowhow/_constants";
import { ITEMS_PER_PAGE } from "./../../app/(main)/boards/knowhow/_constants/index";
import { deleteKnowhow, postKnowhow, patchKnowhow } from "@/apis/knowhow";
import { TResponseStatus } from "@/types/knowhow.type";
import { Tables } from "@/types/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Error from "next/error";
import { useRouter } from "next/navigation";

const DEFAULT_KNOWHOWS_QUERY_KEY = [
  "knowhows",
  {
    page: 1,
    limit: ITEMS_PER_PAGE,
    sortOrder: SORT_LATEST,
    selectedSearchOption: SEARCH_TITLECONTENT,
    searchKeyword: ""
  }
];

const useKnowhowMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: addKnowhow } = useMutation<TResponseStatus, Error, Partial<Tables<"knowhow_posts">>>({
    mutationFn: (newKnowhow) => postKnowhow(newKnowhow),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DEFAULT_KNOWHOWS_QUERY_KEY
      });
      router.replace("/boards/knowhow");
    }
  });

  const { mutateAsync: updateKnowhow } = useMutation<TResponseStatus, Error, Partial<Tables<"knowhow_posts">>>({
    mutationFn: (updatedKnowhow) => patchKnowhow(updatedKnowhow),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DEFAULT_KNOWHOWS_QUERY_KEY
      });
      router.replace("/boards/knowhow");
    }
  });
  const { mutateAsync: removeKnowhow } = useMutation<TResponseStatus, Error, Tables<"knowhow_posts">["knowhow_postId"]>(
    {
      mutationFn: (knowhowId) => deleteKnowhow(knowhowId),
      onSuccess: (status, knowhowId) => {
        queryClient.invalidateQueries({
          queryKey: DEFAULT_KNOWHOWS_QUERY_KEY
        });
        router.replace("/boards/knowhow");
      }
    }
  );
  return { addKnowhow, updateKnowhow, removeKnowhow };
};

export default useKnowhowMutation;
