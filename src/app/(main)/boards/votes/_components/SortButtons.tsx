type SortButtonsProps = {
  sortOrder: string;
  handleSortOrderChange: (order: string) => void;
};

function SortButtons({ sortOrder, handleSortOrderChange }: SortButtonsProps) {
  return (
    <nav className="justify-start items-center gap-[11px] flex">
      <button
        onClick={() => handleSortOrderChange("latest")}
        className={`text-base font-semibold leading-normal ${sortOrder === "latest" ? "text-point" : "text-[#767676]"}`}
      >
        최신 순
      </button>
      <button
        onClick={() => handleSortOrderChange("votes")}
        className={`text-base font-semibold leading-normal ${sortOrder === "votes" ? "text-point" : "text-[#767676]"}`}
      >
        투표수 순
      </button>
    </nav>
  );
}

export default SortButtons;
