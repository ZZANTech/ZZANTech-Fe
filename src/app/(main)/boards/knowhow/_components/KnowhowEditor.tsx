"use client";

import { useCallback, useRef, useState, FormEventHandler, useEffect } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/Button/Button";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { ReactQuillProps } from "react-quill";
import useKnowhowImageMutation from "@/stores/queries/useKnowhowImageMutation";
import useKnowhowMutation from "@/stores/queries/useKnowhowMutation";
import { TKnowhow } from "@/types/knowhow.type";
import { useUserContext } from "@/provider/contexts/userContext";

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
    container: [[{ header: [1, 2, 3, 4, 5, false] }], ["bold", "underline"], ["image"]],
    handlers: {
      image: imageHandler
    }
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
  "indent",
  "background",
  "color",
  "link",
  "image",
  "video",
  "width"
];

function KnowhowEditor({ previousContent }: KnowhowEditorProps) {
  const { user } = useUserContext();
  const { addKnowhowImage } = useKnowhowImageMutation();
  const { addKnowhow, updateKnowhow } = useKnowhowMutation();
  const quillRef = useRef<ReactQuill>(null);
  const [editorTitle, setEditorTitle] = useState<string>(previousContent?.title || "");
  const [editorContent, setEditorContent] = useState<string>(previousContent?.content || "");

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

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

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
      console.log(user);
      const newKnowhow = {
        title: editorTitle,
        content,
        image_urls: imageUrls,
        user_id: user.userId
      };

      try {
        if (previousContent) {
          const res = await updateKnowhow({ ...newKnowhow, knowhow_postId: previousContent.knowhow_postId });
        } else {
          await addKnowhow(newKnowhow);
        }
      } catch (error) {
        console.log(error);
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        className="h-[50px]"
        id="title"
        onChange={(e) => setEditorTitle(e.target.value)}
        value={editorTitle}
        type="text"
      />
      <QuillNoSSRWrapper
        forwardedRef={quillRef}
        className="mb-12 h-[800px]"
        modules={modules}
        formats={formats}
        value={editorContent}
        onChange={handleEditorChange}
      />
      <Button>작성하기</Button>
    </form>
  );
}

export default KnowhowEditor;
