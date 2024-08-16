import { useCallback } from "react";
import ReactQuill from "react-quill";

const useImageHandler = (quillRef: React.RefObject<ReactQuill>) => {
  const handleImageUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Image = e.target?.result;
      if (typeof base64Image === "string") {
        const quillObj = quillRef.current?.getEditor();
        const range = quillObj?.getSelection();
        if (quillObj && range) {
          const img = new Image();
          img.src = base64Image;
          img.onload = () => {
            const { width, height } = img;
            quillObj.insertEmbed(range.index, "image", base64Image);
            quillObj.setSelection(range.index + 1, 0);

            const imgElement = quillObj.root.querySelector(`img[src='${base64Image}']`);
            if (imgElement) {
              imgElement.setAttribute("width", `${width}`);
              imgElement.setAttribute("height", `${height}`);
            }
          };
        }
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
  }, [quillRef]);

  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.startsWith("image/")) {
            const file = items[i].getAsFile();
            if (file) {
              e.preventDefault();
              handleImageUpload(file);
            }
          }
        }
      }
    },
    [handleImageUpload]
  );

  return { imageHandler, handlePaste };
};

export default useImageHandler;
