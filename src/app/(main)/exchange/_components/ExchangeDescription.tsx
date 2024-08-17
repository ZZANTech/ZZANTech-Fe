import DescriptionTagList from "@/app/(main)/boards/knowhow/_components/DescriptionTagList";
import Image from "next/image";
import exchangeDescriptionImage from "/public/description_images/exchange.png";

const tags = ["차곡차곡", "짠포인트", "기프티콘"];
function ExchangeDescription() {
  return (
    <section
      className="
      flex flex-col-reverse mb-5  w-full h-[213px]  md:justify-between px-5 py-6 bg-ivory rounded-xl
    md:mb-10 md:p-5 md:flex md:flex-row md:h-[180px] md:items-end
    "
    >
      <div
        className="
      gap-2
      md:mb-[37px]
      "
      >
        <h1
          className="
        text-gray-900 h-[29] text-xl font-semibold
        md:text-2xl
        "
        >
          포인트 모아 기프티콘 사자!
        </h1>
        <p className="text-gray-900 text-base md:mb-5">
          티끌 모아 작은 행복! <span className="block md:inline">짠에서 모은 포인트로 혜택을 누리세요!</span>
        </p>
        <DescriptionTagList tags={tags} />
      </div>
      <div
        className="
       relative w-[295px] h-[70px] mb-5
       md:w-[412px] md:h-24 md:md-[21px] md:mr-[clamp(0px,0vw,62px)]
       lg:mr-[62px]

      "
      >
        <Image className="object-contain" src={exchangeDescriptionImage} priority loading="eager" alt="기프티콘" fill />
      </div>
    </section>
  );
}

export default ExchangeDescription;
