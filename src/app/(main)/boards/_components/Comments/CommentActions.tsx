type CommentActionsProps = {
  onOpenModal: () => void;
  onEditModeChange: () => void;
};

function CommentActions({ onOpenModal: handleOpenModal, onEditModeChange: handleEditModeChange }: CommentActionsProps) {
  return (
    <div className="flex gap-2">
      <span className="cursor-pointer text-[#acacac] text-sm font-normal leading-3" onClick={handleEditModeChange}>
        수정
      </span>
      <div className="w-px h-3 bg-[#d9d9d9]" />
      <span className="cursor-pointer text-[#acacac] text-sm font-normal leading-3" onClick={handleOpenModal}>
        삭제
      </span>
    </div>
  );
}

export default CommentActions;
