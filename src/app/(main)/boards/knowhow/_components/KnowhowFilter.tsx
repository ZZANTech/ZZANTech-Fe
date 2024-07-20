import { SORT_OPTIONS, TSortOption } from "./KnowhowContainer";

type KnowhowFilterTypes = {
  sortOrder: TSortOption["value"];
  onSortOrderChange: (value: TSortOption["value"]) => void;
};

function KnowhowFilter({ sortOrder, onSortOrderChange }: KnowhowFilterTypes) {
  return (
    <div>
      <input type="text" placeholder="검색어를 입력해주세요" />
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortOrderChange(option.value)}
          className={sortOrder === option.value ? "active" : ""}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default KnowhowFilter;
