"use client";

import Button from "@/components/Button/Button";
import { useState } from "react";

function VoteWriteForm() {
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

  return (
    <div>
      <form>
        <div className="flex items-center gap-2">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border rounded-md"
            placeholder="제목을 입력해 주세요 (2~100자)"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="productName">소비 내역</label>
          <input
            type="text"
            id="productName"
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 p-2 border rounded-md"
            placeholder="소비 내역을 입력해 주세요 (2~100자)"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="productPrice">가격</label>
          <input
            type="text"
            id="productPrice"
            onChange={(e) => setProductPrice(Number(e.target.value))}
            className="mt-1 p-2 border rounded-md"
            placeholder="가격을 입력해 주세요 (숫자만, 3~10자)"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="content">내용</label>
          <textarea
            className="mt-1 p-2 border rounded-md"
            id="content"
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해 주세요 (2~200자)"
          ></textarea>
        </div>
        <div className="flex items-center gap-2">
          <label className="imageUrl">사진 첨부</label>
          <div>
            {/* 첨부파일 미리보기 */}
            {imageUrl && <img src={imageUrl} alt="첨부된 사진 미리보기 이미지" className="w-32 h-32 object-cover" />}
            <input type="file" id="imageUrl" onChange={handleImageChange} />
          </div>
        </div>
        <div>
          <Button>취소</Button>
          <Button>등록하기</Button>
        </div>
      </form>
    </div>
  );
}

export default VoteWriteForm;
