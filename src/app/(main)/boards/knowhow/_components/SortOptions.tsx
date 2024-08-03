import { SORT_OPTIONS, TOption } from "@/app/(main)/boards/knowhow/_constants";
import { useRouter, useSearchParams } from "next/navigation";

type SortOptionsProps = {
  onSortOrderChange: (value: TOption["value"]) => void;
  sortOrder: TOption["value"];
};

function SortOptions({ onSortOrderChange, sortOrder }: SortOptionsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortOrderChange = (value: TOption["value"]) => {
    onSortOrderChange(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortOrder", value);
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="justify-start items-center gap-[11px] flex">
      {SORT_OPTIONS.map((option) => (
        <button
          className={`text-base font-semibold leading-normal ${option.value === sortOrder ? "text-[#ff6000]" : "text-[#767676]"}`}
          key={option.value}
          onClick={() => handleSortOrderChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default SortOptions;
