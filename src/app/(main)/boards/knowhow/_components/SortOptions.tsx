import { SORT_OPTIONS, TOption } from "../_constants";

type SortOptionsProps = {
  onSortOrderChange: (value: TOption["value"]) => void;
};

function SortOptions({ onSortOrderChange }: SortOptionsProps) {
  return (
    <div>
      {SORT_OPTIONS.map((option) => (
        <button key={option.value} onClick={() => onSortOrderChange(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default SortOptions;
