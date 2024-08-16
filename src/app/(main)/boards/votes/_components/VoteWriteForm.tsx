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
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import Button from "@/components/Button";

type VoteWriteFormProps = {
  previousContent?: TVote;
};

function VoteWriteForm({ previousContent }: VoteWriteFormProps) {
  const { user } = useUserContext();
  const { displayDefaultAlert } = useAlertModal();
  const { addVote, isPostPending, updateVote, isPatchPending } = useVoteMutation();
  const router = useRouter();
  const modal = useModal();

  const [title, setTitle] = useState<string>(previousContent?.title || "");
  const [productName, setProductName] = useState<string>(previousContent?.product_name || "");
  const [productPrice, setProductPrice] = useState<string>(previousContent?.product_price?.toString() || "");
  const [content, setContent] = useState<string>(previousContent?.content || "");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(previousContent?.image_url || null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

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
      newErrors.productPrice = "구매 가격은 필수 입력 항목입니다.";
    }
    if (isNaN(Number(productPrice))) {
      newErrors.productPrice = "구매 가격은 숫자만 입력해 주세요.";
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
    setIsUploading(true);

    let uploadedImageUrl: string | null = imageUrl;

    if (image) {
      try {
        const uploadResponse = await uploadImage(image, "vote_image");
        uploadedImageUrl = uploadResponse.url;
      } catch (error) {
        displayDefaultAlert("이미지 업로드에 실패했습니다.");
        console.log(error);
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
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
        if (isPostPending) return;
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
    if (isPostPending || isUploading) return;
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
    <form onSubmit={handleOpenConfirmModal} className="w-[588px] flex flex-col gap-5 mt-[120px] mx-auto">
      <div className="flex items-start gap-3">
        <label htmlFor="title" className="w-[100px] text-base font-normal text-[#1b1b1b]">
          제목 <span className="text-[#dc0000]">*</span>
        </label>
        <div className="w-[496px] flex flex-col flex-1 gap-2">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-11 px-4 py-3 bg-white rounded-lg border border-[#a5a5a5]"
            placeholder="제목을 30자 이내로 입력해 주세요."
            maxLength={30}
          />
          {errors.title && <span className="text-red-500 text-[13px] leading-[18px]">{errors.title}</span>}
        </div>
      </div>
      <div className="flex items-start gap-3">
        <label htmlFor="productName" className="w-[100px] text-base font-normal text-[#1b1b1b]">
          소비 내역 <span className="text-[#dc0000]">*</span>
        </label>
        <div className="flex flex-col flex-1 gap-2">
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full h-11 px-4 py-3 bg-white rounded-lg border border-[#a5a5a5]"
            placeholder="소비한 물건이나 내역을 20자 이내로 입력해 주세요."
            maxLength={20}
          />
          {errors.productName && <span className="text-red-500 text-[13px] leading-[18px]">{errors.productName}</span>}
        </div>
      </div>
      <div className="flex items-start gap-3">
        <label htmlFor="productPrice" className="w-[100px] text-base font-normal text-[#1b1b1b]">
          구매 가격 <span className="text-[#dc0000]">*</span>
        </label>
        <div className="flex flex-col flex-1 gap-2">
          <input
            type="text"
            id="productPrice"
            value={productPrice}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) setProductPrice(value);
            }}
            className="w-full h-11 px-4 py-3 bg-white rounded-lg border border-[#a5a5a5]"
            placeholder="구매한 가격을 10자 이내로 입력해 주세요. 예) 9900"
            maxLength={10}
          />
          {errors.productPrice && (
            <span className="text-red-500 text-[13px] leading-[18px]">{errors.productPrice}</span>
          )}
        </div>
      </div>
      <div className="flex items-start gap-3">
        <label htmlFor="content" className="w-[100px] text-base font-normal text-[#1b1b1b]">
          내용 <span className="text-[#dc0000]">*</span>
        </label>
        <div className="flex flex-col flex-1 gap-2">
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[99px] px-4 py-3 bg-white rounded-lg border border-[#a5a5a5] resize-none"
            placeholder="내용을 100자 이내로 입력해 주세요."
            maxLength={100}
          />
          {errors.content && <span className="text-red-500 text-[13px] leading-[18px]">{errors.content}</span>}
        </div>
      </div>
      <div className="flex items-start gap-3">
        <label htmlFor="image" className="w-[100px] text-base font-normal text-[#1b1b1b]">
          사진 첨부 <span className="text-[#dc0000]">*</span>
        </label>
        <div className="flex flex-col flex-1 gap-2">
          {image || imageUrl ? (
            <div className="relative w-[120px] h-[80px] mb-2">
              <Image
                src={image ? URL.createObjectURL(image) : imageUrl!}
                alt="첨부된 사진 미리보기 이미지"
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : null}
          <div className="flex items-center gap-3">
            <div className="text-sm min-w-[92px]">
              {image ? <span>{image.name}</span> : <span>선택된 파일 없음</span>}
            </div>
            <label className="h-7 px-2 py-1 rounded-lg border border-[#111111] justify-center items-center inline-flex hover:cursor-pointer">
              <div className="self-stretch justify-center items-center gap-0.5 flex">
                <span className="w-[60px] h-[18px] text-center text-[#1b1b1b] text-[13px] font-normal leading-[18px]">
                  파일 선택
                </span>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) => {
                    setImage(e.target.files?.[0] || null);
                    setImageUrl(null);
                  }}
                  className="hidden"
                />
              </div>
            </label>
          </div>
          {errors.image && <span className="text-red-500 text-[13px] leading-[18px]">{errors.image}</span>}
        </div>
      </div>
      <div className="flex justify-center gap-[29px] mt-[80px]">
        <Button onClick={handleCancel} variant="white" size="medium" weight="semibold" className="rounded">
          취소하기
        </Button>
        <Button
          type="submit"
          disabled={isPostPending || isUploading}
          variant="black"
          size="medium"
          weight="semibold"
          className="rounded"
        >
          등록하기
        </Button>
      </div>
      {(isPostPending || isUploading || isPatchPending) && <LoadingSpinner isSubmitting />}
    </form>
  );
}

export default VoteWriteForm;
