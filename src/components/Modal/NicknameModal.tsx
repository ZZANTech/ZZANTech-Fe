"use client";

import { checkDuplicationNickname, updateNickname } from "@/apis/auth";
import Button from "@/components/Button";
import useAlertModal from "@/hooks/useAlertModal";
import { useUserContext } from "@/provider/contexts/UserContext";
import { TNicknameModalInputs } from "@/types/auth.types";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";

function NicknameModal() {
  const { user } = useUserContext();
  const oldNickname = user?.nickname;
  const queryClient = useQueryClient();
  const modal = useAlertModal();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<TNicknameModalInputs>();

  const onSubmit: SubmitHandler<TNicknameModalInputs> = async (data) => {
    try {
      const nickname = data.nickname;
      const email = user?.email;
      const res = await updateNickname(nickname, email || "");
      if (res.ok) {
        queryClient.invalidateQueries();
        modal.displayDefaultAlert("닉네임 변경 완료!");
        // router.replace("/login");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-11">
        <h2 className="text-2xl font-bold mb-6">닉네임 변경</h2>
        <div className="flex flex-col mb-10">
          <input
            type="text"
            placeholder="최소 2~7자 한글, 영어, 슷자"
            className={`auth-input ${errors.nickname ? "border-info-red" : ""}`}
            maxLength={7}
            {...register("nickname", {
              required: "필수 사항 입니다.",
              pattern: {
                value: /^(?=.*[a-zA-Z가-힣])[a-zA-Z0-9가-힣]{2,7}$/,
                message: "특수문자를 포함하거나 한글 자음/모음 단독 사용은 어렵습니다."
              },
              minLength: 3,
              maxLength: 7,
              validate: {
                checkUrl: async (nickname) => await checkDuplicationNickname(nickname)
              }
            })}
          />
          {errors.nickname && <span className="text-info-red text-xs">{errors.nickname.message}</span>}
        </div>

        <div className="flex w-80 gap-5 items-center justify-center">
          <Button variant={"white"} size={"modalMedium"}>
            취소하기
          </Button>
          <Button type="submit" size={"modalMedium"} disabled={watch("nickname") === ""}>
            변경하기
          </Button>
        </div>
      </form>
    </>
  );
}

export default NicknameModal;
