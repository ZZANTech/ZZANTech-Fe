import { MY_POSTS_FILTER_OPTION, TOption } from "@/app/(main)/boards/knowhow/_constants";
import Button from "@/components/Button/Button";

type FilterOptionProps = {
  onFilterOptionChange: (option: TOption["value"]) => void;
};

function FilterOption({ onFilterOptionChange }: FilterOptionProps) {
  return (
    <>
      <ul className="flex gap-2 mb-5">
        {MY_POSTS_FILTER_OPTION.map((option) => (
          <Button onClick={() => onFilterOptionChange(option.value)} key={option.value}>
            {option.label}
          </Button>
        ))}
      </ul>
    </>
  );
}

export default FilterOption;
