"use client";

type NavButtonProps = {
  direction: string;
};

function NavButton({ direction }: NavButtonProps) {
  const text = direction === "next" ? ">" : "<";

  return (
    <div className="w-[74px] h-[74px] relative bg-white rounded-[74px] border border-[#1b1b1b]">
      {direction === "next" ? (
        <div className="w-[15px] h-[15px] left-[35px] top-[26.39px] absolute origin-top-left rotate-45 border-r border-t border-[#1b1b1b]" />
      ) : (
        <div className="w-[15px] h-[15px] left-[39px] top-[47.61px] absolute origin-top-left rotate-[-135deg] border-r border-t border-[#1b1b1b]" />
      )}
    </div>
  );
}

export default NavButton;
