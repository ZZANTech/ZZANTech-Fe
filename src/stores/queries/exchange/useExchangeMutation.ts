import { postClaim } from "@/apis/exchange";
import useAlertModal from "@/hooks/useAlertModal";
import { TResponseStatus } from "@/types/knowhow.type";
import { Tables } from "@/types/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useExchangeMutation = () => {
  const queryClient = useQueryClient();
  const { displayDefaultAlert } = useAlertModal();
  const { mutateAsync: addClaim, isPending } = useMutation<TResponseStatus, Error, Partial<Tables<"gift_claims">>>({
    mutationFn: (newClaim) => postClaim(newClaim),
    onSuccess: (data, newClaim) => {
      displayDefaultAlert("교환 신청이 완료되었습니다", "1일~3일 이내에 발송될 예정입니다");
      queryClient.invalidateQueries({
        queryKey: ["claims", { userId: newClaim.user_id }]
      });
    },
    onError: (e) => displayDefaultAlert(e.message)
  });
  return { addClaim, isPending };
};
export default useExchangeMutation;
