import { useRouter, useSearchParams } from "next/navigation";
import { CLAIM, TOption } from "@/app/(main)/boards/knowhow/_constants";
import { useUserContext } from "@/provider/contexts/UserContext";
import useAlertModal from "@/hooks/useAlertModal";

type FilterOptionProps = {
  options: TOption[];
  onFilterOptionChange: (option: TOption["value"]) => void;
  filterOption: TOption["value"];
};

function FilterOption({ options, onFilterOptionChange, filterOption }: FilterOptionProps) {
  const { user } = useUserContext();
  const { displayLoginAlert } = useAlertModal();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterOptionChange = (value: TOption["value"]) => {
    if (value === CLAIM && !user) {
      displayLoginAlert();
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set("filter", value);
    router.push(`?${params.toString()}`);
    onFilterOptionChange(value);
  };

  return (
    <ul className="flex">
      {options.map((option) => (
        <button
          className={`w-40 h-[52px] p-2 mb-12 border-b text-base font-semibold ${filterOption === option.value ? "border-[#FF6000] text-[#FF6000]" : "border-gray-500 text-gray-500"} cursor-pointer`}
          onClick={() => handleFilterOptionChange(option.value)}
          key={option.value}
        >
          {option.label}
        </button>
      ))}
    </ul>
  );
}

export default FilterOption;
