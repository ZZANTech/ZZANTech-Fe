"use client";

import Image from "next/image";
import GradeInfo from "./GradeInfo";
import { useRouter } from "next/navigation";

function GradeInfoContainer() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <div>
      <GradeInfo onClose={handleClose} />
    </div>
  );
}

export default GradeInfoContainer;
