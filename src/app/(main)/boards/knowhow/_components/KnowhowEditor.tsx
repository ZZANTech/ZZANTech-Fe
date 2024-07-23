"use client";

import React, { useCallback, FormEventHandler, useRef } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/Button/Button";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { ReactQuillProps } from "react-quill";
import { BASE_URL } from "@/constants";

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
  { ssr: false }
);

const getModules = (imageHandler: () => void, pasteImageHandler: (node: any, delta: any) => void) => ({
  toolbar: {
    container: [["image"], [{ header: [1, 2, 3, 4, 5, false] }], ["bold", "underline"]],
    handlers: {
      image: imageHandler
    }
  },
  clipboard: {
    matchers: [
      [
        "img",
        (node: any, delta: any) => {
          pasteImageHandler(node, delta);
          return new delta.constructor(); // TODO: any지우기
        }
      ]
    ]
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

function KnowhowEditor() {
  const titleRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<ReactQuill>(null);

  const uploadImage = async (file: File | Blob) => {
    const formData = new FormData();
    formData.append("profile", file);
    try {
      const res = await fetch(`${BASE_URL}/api/knowhow/image`, {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      return data.url;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;
      const url = await uploadImage(file);
      if (url) {
        const quillObj = quillRef.current?.getEditor();
        const range = quillObj?.getSelection();
        if (range) {
          quillObj?.insertEmbed(range.index, "image", url);
          quillObj?.setSelection(range.index + 1, 0); // 이미지 직후로 커서 이동
        }
      }
    };
  }, []);

  const pasteImageHandler = useCallback(async (node: any, delta: any) => {
    const imageUrl = node.src;
    const res = await fetch(imageUrl);
    const blob = await res.blob();
    const url = await uploadImage(blob);
    if (url) {
      const quillObj = quillRef.current?.getEditor();
      const range = quillObj?.getSelection();
      if (range) {
        quillObj?.insertEmbed(range.index, "image", url);
        quillObj?.setSelection(range.index + 1, 0);
      }
    }
  }, []);

  const handleEditorChange = (value: string) => {
    console.log("Editor content:", value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newKnowhow = {
      title: titleRef?.current?.value,
      content: quillRef.current?.value
    };
    console.log(newKnowhow);
  };

  const modules = getModules(imageHandler, pasteImageHandler);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input id="title" ref={titleRef} type="text" />
      <QuillNoSSRWrapper forwardedRef={quillRef} modules={modules} formats={formats} onChange={handleEditorChange} />
      <Button>작성하기</Button>
    </form>
  );
}

export default KnowhowEditor;
