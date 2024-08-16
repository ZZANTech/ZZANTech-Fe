import { MAX_CONTENT_LENGTH } from "@/app/(main)/boards/knowhow/_constants";
import { Tables } from "@/types/supabase";

const useFormValidation = (setError: React.Dispatch<React.SetStateAction<{ title: string; content: string }>>) => {
  const validateKnowhowForm = (newKnowhow: Partial<Tables<"knowhow_posts">>): boolean => {
    const newErrorMessage = { title: "", content: "" };
    const doc = new DOMParser().parseFromString(newKnowhow.content || "", "text/html");
    const textContent = doc.body.textContent || "";

    if (!newKnowhow.title?.trim()) {
      newErrorMessage.title = "제목은 필수 입력 항목입니다.";
    } else if (newKnowhow.title.length < 2 || newKnowhow.title.length > 50) {
      newErrorMessage.title = "제목을 2자 이상 50자 이하로 입력해 주세요.";
    }
    if (!textContent.trim()) {
      newErrorMessage.content = "내용을 입력해주세요.";
    }
    if (textContent.length > MAX_CONTENT_LENGTH) {
      newErrorMessage.content = `내용은 ${MAX_CONTENT_LENGTH}자 이하로 입력해주세요.`;
    }
    if (newErrorMessage.title || newErrorMessage.content) {
      setError(newErrorMessage);
      return false;
    }
    return true;
  };

  return { validateKnowhowForm };
};

export default useFormValidation;
