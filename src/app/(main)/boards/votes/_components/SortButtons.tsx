type SortButtonsProps = {
  sortOrder: string;
  handleSortOrderChange: (order: string) => void;
};

function SortButtons({ sortOrder, handleSortOrderChange }: SortButtonsProps) {
  const buttons = [
    { label: "최신 순", order: "latest" },
    { label: "투표수 순", order: "votes" }
  ];

  return (
    <nav className="flex justify-start items-center gap-[11px]">
      {buttons.map(({ label, order }) => (
        <button
          key={order}
          onClick={() => handleSortOrderChange(order)}
          className={`text-base font-semibold ${sortOrder === order ? "text-point" : "text-[#767676]"}`}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}

export default SortButtons;
