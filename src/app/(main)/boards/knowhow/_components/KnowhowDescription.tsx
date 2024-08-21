import DescriptionTagList from "@/app/(main)/boards/knowhow/_components/DescriptionTagList";
import { KNOWHOW_TAG_LIST } from "@/app/(main)/boards/knowhow/_constants";
import webImage from "/public/description_images/knowhow_web.png";
import mobileImage from "/public/description_images/knowhow_mobile.png";
import Image from "next/image";

function KnowhowDescription() {
  return (
    <>
      <section
        className="
        mb-3 w-full py-3 
        md:mb-6 md:mt-[60px] md:p-5
        "
      >
        <div
          className="
        flex w-full justify-between
        md:mb-[30px]"
        >
          <div
            className="
          flex flex-col
          md:mb-[7px] 
          "
          >
            <div
              className="
               mb-1 text-gray-900 text-xl font-semibold self-stretch
               md:mb-2 md:text-2xl md:leading-[29px]
            "
            >
              <h1 className="hidden md:block">짠 노하우를 공유해요!</h1>
              <h1 className="block md:hidden">짠 노하우</h1>
            </div>
            <div
              className="
            text-gray-500 text-sm font-normal
            md:mb-5 md:text-base md:leading-[19px] md:text-gray-900
            "
            >
              <p className="hidden md:block">특가 상품, 절약 노하우, 재테크 방법 짠-노하우를 공유해 보세요</p>
              <p className="block md:hidden">
                특가 상품, 절약 노하우, 재테크 방법!
                <br />
                나만의 짠 노하우를 공유해 보세요
              </p>
            </div>
            <DescriptionTagList tags={KNOWHOW_TAG_LIST} />
          </div>

          <div className="hidden md:block relative mr-[clamp(15px,3vw,159px)] mt-3.5 h-[96px] w-[264px]lg:mr-[159px]">
            <Image
              className=" object-cover"
              priority
              loading="eager"
              src={webImage}
              alt="description_image"
              width={264}
              height={96}
            />
          </div>
          <div className="self-end block md:hidden h-[66px] w-[130px]">
            <Image
              className=" object-cover"
              priority
              loading="eager"
              src={mobileImage}
              alt="description_image"
              width={130}
              height={66}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default KnowhowDescription;
