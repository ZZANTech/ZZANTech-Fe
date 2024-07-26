"use client";

import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { TVote } from "@/types/vote.type";
import Button from "@/components/Button/Button";
import useVoteMutation from "@/stores/queries/useVoteMutation";
import { useModal } from "@/provider/contexts/ModalContext";
import { uploadImage } from "@/apis/chat";

type VoteWriteFormProps = {
  previousContent?: TVote;
};

function VoteWriteForm({ previousContent }: VoteWriteFormProps) {
  const { addVote } = useVoteMutation();
  const router = useRouter();
  const modal = useModal();

  const [title, setTitle] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

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

    if (title.length < 2 || title.length > 100) {
      newErrors.title = "제목을 2자 이상 100자 이하로 입력해 주세요.";
    }
    if (!title.trim()) {
      newErrors.title = "제목은 필수 입력 항목입니다.";
    }

    if (productName.length < 2 || productName.length > 100) {
      newErrors.productName = "소비 내역을 2자 이상 100자 이하로 입력해 주세요.";
    }
    if (!productName.trim()) {
      newErrors.productName = "소비 내역은 필수 입력 항목입니다.";
    }

    if (!productPrice || productPrice === 0) {
      newErrors.productPrice = "가격은 필수 입력 항목입니다.";
    }
    if (isNaN(productPrice)) {
      newErrors.productPrice = "가격은 숫자만 입력해 주세요.";
    }

    if (content.length < 2 || content.length > 200) {
      newErrors.content = "내용을 2자 이상 200자 이하로 입력해 주세요.";
    }
    if (!content.trim()) {
      newErrors.content = "내용은 필수 입력 항목입니다.";
    }

    if (!image) {
      newErrors.image = "사진은 필수 입력 항목입니다.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    let imageUrl: string | null = null;

    if (image) {
      try {
        const uploadResponse = await uploadImage(image, "vote_image");
        imageUrl = uploadResponse.url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    const newVote = {
      title,
      product_name: productName,
      product_price: productPrice,
      content,
      image_url: imageUrl ?? undefined,
      user_id: "a16e76cd-30fb-4130-b321-ec457d17783c"
    };

    try {
      await addVote(newVote);
      // 성공적으로 게시글이 등록되었다는 메시지 표시
      // 어떻게 보여주는 게 좋을까?
    } catch (error) {
      // 오류가 발생하여 게시글 등록에 실패했다는 메시지 표시
      // 어떻게 보여주는 게 좋을까?
      console.log(error);
    }
  };

  const handleCancel = () => {
    modal.open({
      content: "정말 게시글 작성을 취소하시겠습니까?",
      type: "confirm",
      onConfirm: () => router.back()
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
          <label htmlFor="title">
            <span>제목</span>
            <span>*</span>
          </label>
          <input
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border rounded-md"
            placeholder="제목을 입력해 주세요 (2~100자)"
            maxLength={100}
          />
          {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="productName">
            <span>소비 내역</span>
            <span>*</span>
          </label>
          <input
            type="text"
            id="productName"
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 p-2 border rounded-md"
            placeholder="소비 내역을 입력해 주세요 (2~100자)"
            maxLength={100}
          />
          {errors.productName && <span className="text-red-500 text-sm">{errors.productName}</span>}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="productPrice">
            <span>가격</span>
            <span>*</span>
          </label>
          <input
            type="text"
            id="productPrice"
            onChange={(e) => setProductPrice(Number(e.target.value))}
            className="mt-1 p-2 border rounded-md"
            placeholder="가격을 입력해 주세요 (숫자만, 3~10자)"
            maxLength={10}
          />
          {errors.productPrice && <span className="text-red-500 text-sm">{errors.productPrice}</span>}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="content">
            <span>내용</span>
            <span>*</span>
          </label>
          <textarea
            className="mt-1 p-2 border rounded-md"
            id="content"
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해 주세요 (2~200자)"
            maxLength={200}
          ></textarea>
          {errors.content && <span className="text-red-500 text-sm">{errors.content}</span>}
        </div>
        <div className="flex items-center gap-2">
          <label className="image">
            <span>사진 첨부</span>
            <span>*</span>
          </label>
          <div>
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="첨부된 사진 미리보기 이미지"
                className="w-32 h-32 object-cover"
              />
            )}
            <input type="file" id="image" onChange={(e) => setImage(e.target.files?.[0] || null)} />
            {errors.image && <span className="text-red-500 text-sm">{errors.image}</span>}
          </div>
        </div>
        <div>
          <Button type="button" onClick={handleCancel}>
            취소
          </Button>
          <Button>등록하기</Button>
        </div>
      </form>
    </div>
  );
}

export default VoteWriteForm;
