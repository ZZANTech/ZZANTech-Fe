type DescriptionTagItemProps = {
  text: string;
};

function DescriptionTagItem({ text }: DescriptionTagItemProps) {
  return <li className="py-1 px-2.5 border leading-[19px] border-gray-900">#{text}</li>;
}

export default DescriptionTagItem;
