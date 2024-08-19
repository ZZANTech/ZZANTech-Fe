"use client";

import useAlertModal from "@/hooks/useAlertModal";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function BlockedUserError() {
  const router = useRouter();
  const { displayDefaultAlert } = useAlertModal();

  useEffect(() => {
    router.replace("/login");
    displayDefaultAlert("로그인이 제한된 사용자입니다");
  }, []);
  return null;
}

export default BlockedUserError;
