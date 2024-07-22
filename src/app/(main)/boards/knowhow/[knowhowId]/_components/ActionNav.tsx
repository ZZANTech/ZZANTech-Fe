import Button from "@/components/Button/Button";

function ActionNav() {
  return (
    <nav className="flex gap-1">
      <Button>수정</Button>
      <Button>삭제</Button>
      <Button href="/boards/knowhow">목록으로</Button>
    </nav>
  );
}

export default ActionNav;
