"use client";

import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { TVote } from "@/types/vote.type";
import useVoteMutation from "@/stores/queries/vote/post/useVoteMutation";
import { useModal } from "@/provider/contexts/ModalContext";
import { uploadImage } from "@/apis/chat";
import useAlertModal from "@/hooks/useAlertModal";
import Image from "next/image";
import { useUserContext } from "@/provider/contexts/UserContext";

type VoteWriteFormProps = {
  previousContent?: TVote;
};

function VoteWriteForm({ previousContent }: VoteWriteFormProps) {
  const { user } = useUserContext();
  const { displayDefaultAlert } = useAlertModal();
  const { addVote, updateVote } = useVoteMutation();
  const router = useRouter();
  const modal = useModal();

  const [title, setTitle] = useState<string>(previousContent?.title || "");
  const [productName, setProductName] = useState<string>(previousContent?.product_name || "");
  const [productPrice, setProductPrice] = useState<string>(previousContent?.product_price?.toString() || "");
  const [content, setContent] = useState<string>(previousContent?.content || "");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(previousContent?.image_url || null);

  const [errors, setErrors] = useState({
    title: "",
    productName: "",
    productPrice: "",
    content: "",
    image: ""
  });

  const validateForm = () => {
    const newErrors = {
      title: "",
      productName: "",
      productPrice: "",
      content: "",
      image: ""
    };

    if (title.length < 2 || title.length > 30) {
      newErrors.title = "제목을 2자 이상 30자 이하로 입력해 주세요.";
    }
    if (!title.trim()) {
      newErrors.title = "제목은 필수 입력 항목입니다.";
    }

    if (productName.length < 2 || productName.length > 20) {
      newErrors.productName = "소비 내역을 2자 이상 20자 이하로 입력해 주세요.";
    }
    if (!productName.trim()) {
      newErrors.productName = "소비 내역은 필수 입력 항목입니다.";
    }

    if (!productPrice || productPrice === "0") {
      newErrors.productPrice = "가격은 필수 입력 항목입니다.";
    }
    if (isNaN(Number(productPrice))) {
      newErrors.productPrice = "가격은 숫자만 입력해 주세요.";
    }

    if (content.length < 2 || content.length > 100) {
      newErrors.content = "내용을 2자 이상 100자 이하로 입력해 주세요.";
    }
    if (!content.trim()) {
      newErrors.content = "내용은 필수 입력 항목입니다.";
    }

    if (!image && !imageUrl) {
      newErrors.image = "사진은 필수 입력 항목입니다.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    let uploadedImageUrl: string | null = imageUrl;

    if (image) {
      try {
        const uploadResponse = await uploadImage(image, "vote_image");
        uploadedImageUrl = uploadResponse.url;
      } catch (error) {
        displayDefaultAlert("이미지 업로드에 실패했습니다.");
        console.log(error);
        return;
      }
    }

    const newVote = {
      title,
      product_name: productName,
      product_price: Number(productPrice) ?? undefined,
      content,
      image_url: uploadedImageUrl ?? undefined,
      user_id: user?.userId
    };

    try {
      if (previousContent) {
        await updateVote({ ...newVote, vote_postId: previousContent.vote_postId });
      } else {
        await addVote(newVote);
      }
    } catch (error) {
      if (previousContent) {
        displayDefaultAlert("게시글 수정에 실패했습니다.");
      } else {
        displayDefaultAlert("게시글 작성에 실패했습니다.");
      }
      console.log(error);
      return;
    }
  };

  const handleOpenConfirmModal: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    modal.open({
      content: `글을 ${previousContent ? "수정" : "작성"}하시겠습니까?`,
      type: "confirm",
      onConfirm: handleSubmit
    });
  };

  const handleCancel = () => {
    modal.open({
      content: `정말 게시글 ${previousContent ? "수정" : "작성"}을 취소하시겠습니까?`,
      type: "confirm",
      onConfirm: () => router.back()
    });
  };

  return (
    <div className="flex justify-center items-center">
      <section className="w-[592px] h-[454px] flex-col justify-start items-start gap-3 inline-flex mx-auto mt-12">
        <form onSubmit={handleOpenConfirmModal} className="self-stretch flex-col justify-start items-start gap-3 flex">
          <div className="self-stretch justify-start items-center gap-3 flex">
            <div className="flex justify-between items-center w-full">
              <label htmlFor="title" className="w-[100px] flex items-center gap-1">
                <span className="text-black text-base font-normal leading-normal">제목</span>
                <span className="text-info-red text-base font-normal leading-[18px]">*</span>
              </label>
              <div className="w-[500px]">
                <input
                  type="text"
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  className="w-full h-11 px-4 py-3 bg-white rounded-lg border border-gray-500"
                  placeholder="제목을 30자 이내로 입력해 주세요."
                  maxLength={30}
                />
                <div className="h-4">
                  {errors.title && <span className="text-info-red-500 text-[13px]">{errors.title}</span>}
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-3 flex">
            <div className="flex justify-between items-center w-full">
              <label htmlFor="productName" className="w-[100px] flex items-center gap-1">
                <span className="text-black text-base font-normal leading-normal">소비 내역</span>
                <span className="text-info-red text-base font-normal leading-[18px]">*</span>
              </label>
              <div className="w-[500px]">
                <input
                  type="text"
                  id="productName"
                  onChange={(e) => setProductName(e.target.value)}
                  value={productName}
                  className="w-full h-11 px-4 py-3 bg-white rounded-lg border border-gray-500"
                  placeholder="소비한 물건이나 내역을 20자 이내로 입력해 주세요."
                  maxLength={20}
                />
                <div className="h-4">
                  {errors.productName && <span className="text-red-500 text-[13px]">{errors.productName}</span>}
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-3 flex">
            <div className="flex justify-between items-center w-full">
              <label htmlFor="productPrice" className="w-[100px] flex items-center gap-1">
                <span className="text-black text-base font-normal leading-normal">가격</span>
                <span className="text-info-red text-base font-normal leading-[18px]">*</span>
              </label>
              <div className="w-[500px]">
                <input
                  type="text"
                  id="productPrice"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setProductPrice(value);
                    }
                  }}
                  value={productPrice}
                  className="w-full h-11 px-4 py-3 bg-white rounded-lg border border-gray-500"
                  placeholder="구매한 가격을 10자 이내로 입력해 주세요. 예) 9900"
                  maxLength={10}
                />
                <div className="h-4">
                  {errors.productPrice && <span className="text-red-500 text-[13px]">{errors.productPrice}</span>}
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-3 flex">
            <div className="flex justify-between items-center w-full">
              <label htmlFor="content" className="w-[100px] flex items-center gap-1">
                <span className="text-black text-base font-normal leading-normal">내용</span>
                <span className="text-info-red text-base font-normal leading-[18px]">*</span>
              </label>
              <div className="w-[500px]">
                <textarea
                  id="content"
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                  className="w-full h-[94px] px-4 py-3 bg-white rounded-lg border border-gray-500"
                  placeholder="내용을 100자 이내로 입력해 주세요."
                  maxLength={100}
                />
                <div className="h-4">
                  {errors.content && <span className="text-red-500 text-[13px]">{errors.content}</span>}
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-3 flex">
            <div className="flex justify-between items-start w-full">
              <label htmlFor="image" className="w-[100px] flex items-center gap-1">
                <span className="text-black text-base font-normal leading-normal">사진 첨부</span>
                <span className="text-info-red text-base font-normal leading-[18px]">*</span>
              </label>
              <div className="w-[500px] flex flex-col">
                {image || imageUrl ? (
                  <div className="relative w-32 h-32 mb-2">
                    <Image
                      src={image ? URL.createObjectURL(image) : imageUrl!}
                      alt="첨부된 사진 미리보기 이미지"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                ) : null}
                <div className="flex items-center gap-3">
                  <div className="text-black text-sm font-normal leading-tight min-w-[100px]">
                    {image ? <span>{image.name}</span> : <span>선택된 파일 없음</span>}
                  </div>
                  <label className="w-[85px] h-7 px-2 py-[3px] rounded border border-[#111111] justify-center items-center gap-2.5 flex cursor-pointer">
                    <div className="justify-center items-center gap-0.5 flex">
                      <div className="text-center text-[#111111] text-xs font-normal leading-[18px]">파일 선택</div>
                    </div>
                    <input
                      type="file"
                      id="image"
                      onChange={(e) => {
                        setImage(e.target.files?.[0] || null);
                        setImageUrl(null);
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="h-4">
                  {errors.image && <span className="text-red-500 text-[13px]">{errors.image}</span>}
                </div>
              </div>
            </div>
          </div>
          <div className="h-12 w-full justify-center items-center gap-[18px] flex mt-12">
            <button
              type="button"
              onClick={handleCancel}
              className="w-40 h-12 px-4 py-3 bg-white rounded-md border border-basic justify-center items-center gap-2.5 flex"
            >
              <div className="text-center text-[#111111] text-base font-semibold leading-tight">취소하기</div>
            </button>
            <button className="w-40 h-12 px-4 py-3 bg-basic rounded-lg justify-center items-center gap-2.5 flex">
              <div className="text-center text-white text-base font-semibold leading-tight">등록하기</div>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default VoteWriteForm;
