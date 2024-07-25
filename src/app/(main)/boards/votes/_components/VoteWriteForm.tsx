import Button from "@/components/Button/Button";

function VoteWriteForm() {
  return (
    <div>
      <form>
        <div className="flex items-center gap-2">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            className="mt-1 p-2 border rounded-md"
            placeholder="제목을 입력해 주세요 (2~100자)"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="productName">소비 내역</label>
          <input
            type="text"
            id="productName"
            className="mt-1 p-2 border rounded-md"
            placeholder="소비 내역을 입력해 주세요 (2~100자)"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="productPrice">가격</label>
          <input
            type="text"
            id="productPrice"
            className="mt-1 p-2 border rounded-md"
            placeholder="가격을 입력해 주세요 (숫자만, 3~10자)"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="content">내용</label>
          <textarea
            className="mt-1 p-2 border rounded-md"
            id="content"
            placeholder="내용을 입력해 주세요 (2~200자)"
          ></textarea>
        </div>
        <div className="flex items-center gap-2">
          <label className="imageUrl">사진 첨부</label>
          <div>
            {/* 첨부파일 미리보기 */}
            <img src="" alt="첨부된 사진 미리보기 이미지" />
            <input type="file" id="imageUrl" />
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
