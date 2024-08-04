import GradeInfoContainer from "@/app/(main)/mypage/_components/Grade/GradeInfoContainer";
import GradeModal from "@/app/(main)/mypage/_components/Grade/GradeModal";
import React from "react";

function GradePage() {
  return (
    <GradeModal>
      <GradeInfoContainer />
    </GradeModal>
  );
}

export default GradePage;
