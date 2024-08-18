import { useRouter, useSearchParams } from "next/navigation";
import { CLAIM, TOption } from "@/app/(main)/boards/knowhow/_constants";
import { useUserContext } from "@/provider/contexts/UserContext";
import useAlertModal from "@/hooks/useAlertModal";
import clsx from "clsx";

type FilterOptionProps = {
  isExchangePage?: boolean;
  options: TOption[];
  onFilterOptionChange: (option: TOption["value"]) => void;
  filterOption: TOption["value"];
};

function FilterOption({ isExchangePage = false, options, onFilterOptionChange, filterOption }: FilterOptionProps) {
  console.log(isExchangePage);
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
    <ul
      className={clsx(
        "flex w-full md:w-auto",
        isExchangePage
          ? "mb-[56px] md:mb-[52px]" //
          : "mb-[35px] md:mb-12"
      )}
    >
      {options.map((option) => (
        <button
          className={clsx(
            "w-full md:w-40 h-[52px] p-2   border-b text-base font-semibold cursor-pointer",
            filterOption === option.value
              ? "border-[#FF6000] text-[#FF6000]" //
              : "border-gray-500 text-gray-500"
          )}
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
