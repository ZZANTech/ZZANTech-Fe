type SortButtonsProps = {
  sortOrder: string;
  handleSortOrderChange: (order: string) => void;
};

function SortButtons({ sortOrder, handleSortOrderChange }: SortButtonsProps) {
  return (
    <div>
      <button onClick={() => handleSortOrderChange("latest")} className={sortOrder === "latest" ? "active" : ""}>
        최신 순
      </button>
      <button onClick={() => handleSortOrderChange("votes")} className={sortOrder === "votes" ? "active" : ""}>
        투표수 순
      </button>
    </div>
  );
}

export default SortButtons;
