"use client";

import { useModal } from "@/provider/contexts/ModalContext";

function NicknameModal() {
  const { close } = useModal(); // 모달 닫을땐 여기서 close 꺼내쓰시면 됩니다.
  const handleChangeNickname = () => {};

  return (
    <form>
      <h2>닉변모달</h2>
      <input type="text" placeholder="" />
      <button onClick={handleChangeNickname}>화이팅!</button>
    </form>
  );
}

export default NicknameModal;
