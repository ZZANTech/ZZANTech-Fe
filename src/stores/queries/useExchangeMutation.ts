import { postClaim } from "@/apis/exchange";
import useAlertModal from "@/hooks/useAlertModal";
import { TResponseStatus } from "@/types/knowhow.type";
import { Tables } from "@/types/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useExchangeMutation = () => {
  const queryClient = useQueryClient();
  const { displayDefaultAlert } = useAlertModal();
  const { mutateAsync: addClaim } = useMutation<TResponseStatus, Error, Partial<Tables<"gift_claims">>>({
    mutationFn: (newClaim) => postClaim(newClaim),
    onSuccess: (data, newClaim) => {
      displayDefaultAlert("교환신청 완료");
      queryClient.invalidateQueries({
        queryKey: ["claims", { userId: newClaim.user_id }]
      });
    },
    onError: (e) => displayDefaultAlert(e.message)
  });
  return { addClaim };
};
export default useExchangeMutation;
