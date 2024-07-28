import LevelDetails from "@/app/(main)/mypage/_components/Level/LevelDetails";
import LevelTitle from "@/app/(main)/mypage/_components/Level/LevelTitle";

function LevelContainer() {
  return (
    <div className="flex flex-col gap-5 ">
      <LevelTitle />
      <LevelDetails />
    </div>
  );
}

export default LevelContainer;
