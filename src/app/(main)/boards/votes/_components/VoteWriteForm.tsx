"use client";

import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { TVote } from "@/types/vote.type";
import Button from "@/components/Button/Button";
import useVoteMutation from "@/stores/queries/useVoteMutation";
import { useModal } from "@/provider/contexts/ModalContext";

type VoteWriteFormProps = {
  revalidate?: (voteId: TVote["vote_postId"]) => void;
};

function VoteWriteForm({ revalidate }: VoteWriteFormProps) {
  const { addVote } = useVoteMutation(revalidate);
  const router = useRouter();
  const modal = useModal();

  const [title, setTitle] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      setImageUrl(URL.createObjectURL(image));
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const newVote = {
      title,
      product_name: productName,
      product_price: productPrice,
      content,
      image_url: imageUrl,
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
        </div>
        <div className="flex items-center gap-2">
          <label className="imageUrl">
            <span>사진 첨부</span>
            <span>*</span>
          </label>
          <div>
            {imageUrl && <img src={imageUrl} alt="첨부된 사진 미리보기 이미지" className="w-32 h-32 object-cover" />}
            <input type="file" id="imageUrl" onChange={handleImageChange} />
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
