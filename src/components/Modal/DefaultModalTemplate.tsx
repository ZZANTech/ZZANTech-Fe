import { ReactNode } from "react";

type DefaultModalTemplateProps = {
  content: string;
  subContent?: string;
  children: ReactNode;
};

function DefaultModalTemplate({ content, subContent, children }: DefaultModalTemplateProps) {
  return (
    <div>
      <div className="flex flex-col mt-[82px] text-xl text-[#1b1b1b] font-semibold gap-3">
        <p className="text-center">{content}</p>
        {subContent && <p className="text-center">{subContent}</p>}
      </div>
      <div className="flex justify-center items-center  absolute bottom-[30px] right-1/2 translate-x-1/2 text-xl font-bold ">
        {children}
      </div>
    </div>
  );
}

export default DefaultModalTemplate;
