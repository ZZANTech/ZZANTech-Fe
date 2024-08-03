"use client";

import { useCallback, useRef, useState, FormEventHandler, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Button from "@/components/Button/Button";
import ReactQuill, { ReactQuillProps } from "react-quill";
import useKnowhowImageMutation from "@/stores/queries/useKnowhowImageMutation";
import useKnowhowMutation from "@/stores/queries/useKnowhowMutation";
import { TKnowhow } from "@/types/knowhow.type";
import { useUserContext } from "@/provider/contexts/UserContext";
import { useModal } from "@/provider/contexts/ModalContext";
import { useRouter } from "next/navigation";
import { Tables } from "@/types/supabase";
import { MAX_CONTENT_LENGTH } from "@/app/(main)/boards/knowhow/_constants";
import ErrorMessage from "@/app/(main)/boards/knowhow/_components/ErrorMessage";

type ForwardedQuillComponent = ReactQuillProps & {
  forwardedRef: React.Ref<ReactQuill>;
};

type KnowhowEditorProps = {
  previousContent?: TKnowhow;
};

const QuillNoSSRWrapper = dynamic<ForwardedQuillComponent>(
  async () => {
    const { default: QuillComponent } = await import("react-quill");

    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent ref={forwardedRef} {...props} />
    );
    return Quill;
  },
  { ssr: false }
);

const getModules = (imageHandler: () => void) => ({
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ["bold"],
      // [{ list: "ordered" }, { list: "bullet" }],
      // [{ script: "sub" }, { script: "super" }],
      // [{ indent: "-1" }, { indent: "+1" }],
      // [{ direction: "rtl" }],
      // [{ size: ["small", false, "large", "huge"] }],
      // [{ color: [] }, { background: [] }],
      // [{ font: [] }],
      // [{ align: [] }],
      ["link", "image"]
    ],
    handlers: {
      image: imageHandler
    }
  },
  clipboard: {
    matchVisual: false
  },

  history: {
    delay: 2000,
    maxStack: 500,
    userOnly: true
  }
});

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "blockquote",
  "list",
  "bullet",
  "script",
  "indent",
  "direction",
  "background",
  "color",
  "link",
  "image",
  "video"
];

function KnowhowEditor({ previousContent }: KnowhowEditorProps) {
  const router = useRouter();
  const { user } = useUserContext();
  const { open } = useModal();
  const { addKnowhowImage } = useKnowhowImageMutation();
  const { addKnowhow, updateKnowhow } = useKnowhowMutation();
  const quillRef = useRef<ReactQuill>(null);
  const [editorTitle, setEditorTitle] = useState<string>(previousContent?.title || "");
  const [editorContent, setEditorContent] = useState<string>(previousContent?.content || "");
  const [errorMessage, setErrorMessage] = useState<{ title: string; content: string }>({ title: "", content: "" });

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target?.result;
      const quillObj = quillRef.current?.getEditor();
      const range = quillObj?.getSelection();
      if (range && typeof base64Image === "string") {
        quillObj?.insertEmbed(range.index, "image", base64Image);
        quillObj?.setSelection(range.index + 1, 0);
      }
    };
    reader.readAsDataURL(file);
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        handleImageUpload(file);
      }
    };
  }, []);

  const validateKnowhowForm = (newKnowhow: Partial<Tables<"knowhow_posts">>): boolean => {
    const newErrorMessage = { title: "", content: "" };
    const doc = new DOMParser().parseFromString(newKnowhow.content || "", "text/html");
    const textContent = doc.body.textContent || "";

    if (!newKnowhow.title?.trim()) {
      newErrorMessage.title = "제목은 필수 입력 항목입니다.";
    }
    if (!textContent) {
      newErrorMessage.content = "내용을 입력해주세요.";
    }
    if (textContent.length > MAX_CONTENT_LENGTH) {
      newErrorMessage.content = `내용은 ${MAX_CONTENT_LENGTH}자 이하로 입력해주세요.`;
    }
    if (newErrorMessage.title || newErrorMessage.content) {
      setErrorMessage(newErrorMessage);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const quillObj = quillRef.current?.getEditor();
    let content = quillObj?.root.innerHTML;

    const base64Images = content?.match(/src="data:image\/[^"]+"/g) || [];
    const urlImages = content?.match(/src="https:\/\/[^"]+"/g) || [];
    const imageFiles: { file: File; base64: string }[] = [];
    const imageUrls: string[] = [];

    base64Images.forEach((imageString, index) => {
      const base64Data = imageString.split('"')[1];
      const file = dataURLtoFile(base64Data, `image-${Date.now()}-${index}.png`);
      imageFiles.push({ file, base64: base64Data });
    });

    urlImages.forEach((imageString) => {
      const url = imageString.split('"')[1];
      imageUrls.push(url);
    });

    if (imageFiles.length > 0) {
      const formData = new FormData();
      imageFiles.forEach(({ file }) => {
        formData.append("img", file);
      });

      try {
        const data = await addKnowhowImage(formData);

        data.forEach((url: { publicUrl: string }, index: number) => {
          const publicUrl = url.publicUrl;
          const base64Data = imageFiles[index].base64;
          content = content?.replace(base64Data, publicUrl);
          imageUrls.push(publicUrl);
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (user) {
      const newKnowhow = {
        title: editorTitle,
        content,
        image_urls: imageUrls,
        user_id: user.userId
      };
      const isValid = validateKnowhowForm(newKnowhow);
      if (isValid) {
        if (previousContent) {
          await updateKnowhow({ ...newKnowhow, knowhow_postId: previousContent.knowhow_postId });
        } else {
          await addKnowhow(newKnowhow);
        }
      }
    }
  };

  const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const modules = getModules(imageHandler);

  useEffect(() => {
    if (previousContent) {
      setEditorTitle(previousContent.title);
      setEditorContent(previousContent.content);
    }
  }, [previousContent]);

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const handleOpenSubmitModal: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    open({
      type: "confirm",
      content: "글을 등록하시겠습니까?",
      buttonContent: "등록",
      onConfirm: handleSubmit
    });
  };

  const handleCancel = () =>
    open({
      type: "confirm",
      content: `정말 게시글 ${previousContent ? "수정" : "작성"}을 취소하시겠습니까?`,
      onConfirm: () => router.back()
    });

  return (
    <form onSubmit={handleOpenSubmitModal} className="h-full flex flex-col">
      <input
        className="w-full h-14  text-3xl outline-none mt-[120px] border-b-2 border-[#000]"
        id="title"
        placeholder="제목을 입력해주세요"
        onChange={(e) => setEditorTitle(e.target.value)}
        value={editorTitle}
        type="text"
      />
      <ErrorMessage className="mb-[17px]">{errorMessage?.title}</ErrorMessage>
      <QuillNoSSRWrapper
        forwardedRef={quillRef}
        className="h-[550px]"
        modules={modules}
        formats={formats}
        value={editorContent}
        onChange={handleEditorChange}
      />

      {<ErrorMessage className="translate-y-11">{errorMessage?.content}</ErrorMessage>}

      <div className="flex gap-[18px] self-end translate-y-16">
        <Button type="button" bgColor="white" onClick={handleCancel}>
          취소하기
        </Button>
        <Button>등록하기</Button>
      </div>
    </form>
  );
}

export default KnowhowEditor;
