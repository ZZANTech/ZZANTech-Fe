import { MY_POSTS_FILTER_OPTION, TOption } from "@/app/(main)/boards/knowhow/_constants";
import Button from "@/components/Button/Button";

type FilterOptionProps = {
  options: TOption[];
  onFilterOptionChange: (option: TOption["value"]) => void;
  filterOption: TOption["value"];
};

function FilterOption({ options, onFilterOptionChange, filterOption }: FilterOptionProps) {
  return (
    <>
      <ul className=" flex">
        {options.map((option) => (
          <button
            className={`w-40 h-[52px] p-2 mb-12 border-b text-base font-semibold  ${filterOption === option.value ? "border-[#FF6000] text-[#FF6000]" : "border-gray-500 text-gray-500"}`}
            onClick={() => onFilterOptionChange(option.value)}
            key={option.value}
          >
            {option.label}
          </button>
        ))}
      </ul>
    </>
  );
}

export default FilterOption;
