"use client";

import useIsWideScreen from "@/hooks/useIsWideScreen";
import DescriptionTagItem from "@/components/DescriptionTagItem";

type DescriptionTagListProps = {
  tags: string[];
};

function DescriptionTagList({ tags }: DescriptionTagListProps) {
  const { isWideScreen } = useIsWideScreen();

  if (!isWideScreen) return null;

  return (
    <ul className="flex gap-2">
      {tags.map((tag) => (
        <DescriptionTagItem key={tag} text={tag} />
      ))}
    </ul>
  );
}

export default DescriptionTagList;
