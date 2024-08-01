import { MY_POSTS_FILTER_OPTION, TOption } from "@/app/(main)/boards/knowhow/_constants";
import Button from "@/components/Button/Button";

type FilterOptionProps = {
  options: TOption[];
  onFilterOptionChange: (option: TOption["value"]) => void;
};

function FilterOption({ options, onFilterOptionChange }: FilterOptionProps) {
  return (
    <>
      <ul className="w-full flex gap-2 mb-5">
        {options.map((option) => (
          <Button onClick={() => onFilterOptionChange(option.value)} key={option.value}>
            {option.label}
          </Button>
        ))}
      </ul>
    </>
  );
}

export default FilterOption;
