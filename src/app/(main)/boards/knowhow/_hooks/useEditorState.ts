import { useState, useEffect, useRef } from "react";
import { TKnowhow } from "@/types/knowhow.type";
import ReactQuill from "react-quill";

type UseEditorStateProps = {
  previousContent?: TKnowhow;
};

function useEditorState({ previousContent }: UseEditorStateProps) {
  const [editorTitle, setEditorTitle] = useState<string>(previousContent?.title || "");
  const [editorContent, setEditorContent] = useState<string>(previousContent?.content || "");
  const [errorMessage, setErrorMessage] = useState<{ title: string; content: string }>({ title: "", content: "" });
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    if (previousContent) {
      setEditorTitle(previousContent.title);
      setEditorContent(previousContent.content);
    }
  }, [previousContent]);

  return {
    editorTitle,
    setEditorTitle,
    editorContent,
    setEditorContent,
    errorMessage,
    setErrorMessage,
    isUploadingImage,
    setIsUploadingImage,
    quillRef
  };
}

export default useEditorState;
