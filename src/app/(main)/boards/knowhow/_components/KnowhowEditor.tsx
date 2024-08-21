"use client";
import { useEffect } from "react";
import Button from "@/components/Button/Button";
import ErrorMessage from "@/app/(main)/boards/knowhow/_components/ErrorMessage";
import ReactQuill, { ReactQuillProps } from "react-quill";
import useFormValidation from "@/app/(main)/boards/knowhow/_hooks/useFormValidation";
import useImageHandler from "@/app/(main)/boards/knowhow/_hooks/useImageHandler";
import useEditorState from "@/app/(main)/boards/knowhow/_hooks/useEditorState";
import { formats, getModules } from "@/app/(main)/boards/knowhow/_utils/quillUtils";
import useFormHandlers from "@/app/(main)/boards/knowhow/_hooks/useFormHandlers";
import { TKnowhow } from "@/types/knowhow.type";
import dynamic from "next/dynamic";
import FlyingTikkle from "@/components/Loading/FlyingTikkle";

type ForwardedQuillComponent = ReactQuillProps & {
  forwardedRef: React.Ref<ReactQuill>;
};
const QuillNoSSRWrapper = dynamic<ForwardedQuillComponent>(
  async () => {
    const { default: QuillComponent } = await import("react-quill");

    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent ref={forwardedRef} {...props} />
    );
    return Quill;
  },

  { loading: () => <div className="h-[550px]"></div>, ssr: false }
);

type KnowhowEditorProps = {
  previousContent?: TKnowhow;
};

function KnowhowEditor({ previousContent }: KnowhowEditorProps) {
  const { editorTitle, setEditorTitle, editorContent, setEditorContent, errorMessage, setErrorMessage, quillRef } =
    useEditorState({ previousContent });
  const { imageHandler, handlePaste } = useImageHandler(quillRef);
  const { validateKnowhowForm } = useFormValidation(setErrorMessage);
  const { handleOpenSubmitModal, handleCancel, isUploadingImage } = useFormHandlers(
    quillRef,
    editorTitle,

    previousContent,
    validateKnowhowForm
  );

  const modules = getModules(imageHandler);

  useEffect(() => {
    const quillObj = quillRef.current?.getEditor();
    if (quillObj) {
      quillObj.root.addEventListener("paste", handlePaste);
      return () => {
        quillObj.root.removeEventListener("paste", handlePaste);
      };
    }
  }, [handlePaste]);

  return (
    <form onSubmit={handleOpenSubmitModal} className="h-full flex flex-col">
      <input
        className="w-full h-14 text-3xl outline-none mt-[91px] border-b-2 border-[#000]"
        id="title"
        placeholder="제목을 입력해주세요"
        onChange={(e) => setEditorTitle(e.target.value)}
        value={editorTitle}
        maxLength={50}
        type="text"
      />
      <ErrorMessage className="quillnn mb-[34px]">{errorMessage?.title}</ErrorMessage>
      <QuillNoSSRWrapper
        forwardedRef={quillRef}
        className="quill_wrapper h-[550px]"
        modules={modules}
        formats={formats}
        value={editorContent}
        onChange={setEditorContent}
      />
      <ErrorMessage className="translate-y-11">{errorMessage?.content}</ErrorMessage>
      <div className="flex gap-[18px] self-end translate-y-16">
        <Button variant="white" size="medium" type="button" onClick={handleCancel}>
          취소하기
        </Button>
        <Button variant="black" size="medium" type="submit" disabled={isUploadingImage}>
          등록하기
        </Button>
      </div>
      {isUploadingImage && <FlyingTikkle isSubmitting />}
    </form>
  );
}

export default KnowhowEditor;
