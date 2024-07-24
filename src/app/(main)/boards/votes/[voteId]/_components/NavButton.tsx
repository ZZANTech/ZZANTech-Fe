"use client";

type NavButtonProps = {
  direction: string;
};

function NavButton({ direction }: NavButtonProps) {
  const text = direction === "next" ? ">" : "<";

  return <button className="bg-white text-black p-2 rounded-full">{text}</button>;
}

export default NavButton;
