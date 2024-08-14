"use client";

import { checkDuplicationNickname, updateNickname } from "@/apis/auth";
import useAlertModal from "@/hooks/useAlertModal";
import { useModal } from "@/provider/contexts/ModalContext";
import { useUserContext } from "@/provider/contexts/UserContext";
import { TNicknameModalInputs } from "@/types/auth.types";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";

function NicknameModal() {
  const { user } = useUserContext();
  const oldNickname = user?.nickname;
  const queryClient = useQueryClient();
  const { close, open } = useModal();
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
      if (res.message === "변경 완료") {
        queryClient.invalidateQueries();
        open({ type: "alert", content: "닉네임 변경 완료" });
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-11">
      <h2 className="text-2xl font-semibold mb-6">닉네임 변경</h2>
      <div className="flex flex-col mb-10">
        <input
          type="text"
          placeholder="최소 2~7자 한글, 영어, 슷자"
          className={`w-[400px] h-12 px-4 py-[14px] border rounded-lg ${errors.nickname ? "border-info-red" : ""}`}
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
        {errors.nickname && <span className="errors-message">{errors.nickname.message}</span>}
      </div>

      <div className="flex gap-5 items-center justify-center">
        <button className="nickname-modal-button">취소</button>
        <button
          className={`nickname-modal-button ${watch("nickname") === "" ? "bg-gray-50 text-gray-400" : "bg-black text-white"} `}
          disabled={watch("nickname") === ""}
        >
          확인
        </button>
      </div>
    </form>
  );
}

export default NicknameModal;
