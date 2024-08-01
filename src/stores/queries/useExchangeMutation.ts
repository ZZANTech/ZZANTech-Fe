import { postClaim } from "@/apis/exchange";
import useAlertModal from "@/hooks/useAlertModal";
import { TResponseStatus } from "@/types/knowhow.type";
import { Tables } from "@/types/supabase";
import { useMutation } from "@tanstack/react-query";

const useExchangeMutation = () => {
  const { displayDefaultAlert } = useAlertModal();
  const { mutateAsync: addClaim } = useMutation<TResponseStatus, Error, Partial<Tables<"gift_claims">>>({
    mutationFn: (newClaim) => postClaim(newClaim),
    onSuccess: () => displayDefaultAlert("교환신청 완료"),
    onError: (e) => displayDefaultAlert(e.message)
  });
  return { addClaim };
};
export default useExchangeMutation;
