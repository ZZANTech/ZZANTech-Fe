import { SORT_OPTIONS, TOption } from "@/app/(main)/boards/knowhow/_constants";

type SortOptionsProps = {
  onSortOrderChange: (value: TOption["value"]) => void;
  sortOrder: TOption["value"];
};

function SortOptions({ onSortOrderChange, sortOrder }: SortOptionsProps) {
  console.log(sortOrder);
  return (
    <div className="flex gap-[11px]">
      {SORT_OPTIONS.map((option) => (
        <button
          className={`${option.value === sortOrder && "text-[#569A68]"}`}
          key={option.value}
          onClick={() => onSortOrderChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default SortOptions;
