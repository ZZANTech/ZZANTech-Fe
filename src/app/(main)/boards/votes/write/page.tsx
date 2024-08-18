import MobileHeader from "@/components/MobileHeader";
import VoteWriteForm from "@/app/(main)/boards/votes/_components/VoteWriteForm";

function VoteWritePage() {
  return (
    <>
      <MobileHeader title="글쓰기" />
      <VoteWriteForm />
    </>
  );
}

export default VoteWritePage;
