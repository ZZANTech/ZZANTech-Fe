import { SORT_LATEST, SEARCH_TITLECONTENT, ITEMS_PER_PAGE } from "@/app/(main)/boards/knowhow/_constants";
import { deleteKnowhow, postKnowhow, patchKnowhow } from "@/apis/knowhow";
import { TKnowhow, TResponseStatus } from "@/types/knowhow.type";
import { Tables } from "@/types/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { revalidated } from "@/utils/revalidation";
import { useModal } from "@/provider/contexts/ModalContext";

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
  const { open } = useModal();
  const displayErrorModal = (content: string) =>
    open({
      type: "alert",
      content
    });
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: addKnowhow } = useMutation<TResponseStatus, Error, Partial<Tables<"knowhow_posts">>>({
    mutationFn: (newKnowhow) => postKnowhow(newKnowhow),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DEFAULT_KNOWHOWS_QUERY_KEY
      });
      router.push("/boards/knowhow");
    },
    onError: (e) => displayErrorModal(e.message)
  });

  const { mutateAsync: updateKnowhow } = useMutation<TResponseStatus, Error, Partial<Tables<"knowhow_posts">>>({
    mutationFn: (updatedKnowhow) => patchKnowhow(updatedKnowhow),
    onSuccess: (status, updatedKnowhow) => {
      queryClient.invalidateQueries({
        queryKey: DEFAULT_KNOWHOWS_QUERY_KEY
      });
      revalidated(`/boards/knowhow/${updatedKnowhow.knowhow_postId}`, "page");
      router.push(`/boards/knowhow/${updatedKnowhow.knowhow_postId}`);
    },
    onError: (e) => displayErrorModal(e.message)
  });

  const { mutateAsync: removeKnowhow } = useMutation<TResponseStatus, Error, Tables<"knowhow_posts">["knowhow_postId"]>(
    {
      mutationFn: (knowhowId) => deleteKnowhow(knowhowId),
      onSuccess: (status, knowhowId) => {
        queryClient.invalidateQueries({
          queryKey: DEFAULT_KNOWHOWS_QUERY_KEY
        });
        router.push("/boards/knowhow");
      },
      onError: (e) => displayErrorModal(e.message)
    }
  );
  return { addKnowhow, updateKnowhow, removeKnowhow };
};

export default useKnowhowMutation;
