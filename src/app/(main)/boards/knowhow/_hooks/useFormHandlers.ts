import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/provider/contexts/ModalContext";
import useKnowhowMutation from "@/stores/queries/knowhow/post/useKnowhowMutation";
import useKnowhowImageMutation from "@/stores/queries/knowhow/post/useKnowhowImageMutation";
import ReactQuill from "react-quill";
import { TKnowhow } from "@/types/knowhow.type";
import { dataURLtoFile } from "@/app/(main)/boards/knowhow/_utils/quillUtils";
import { useUserContext } from "@/provider/contexts/UserContext";

const useFormHandlers = (
  quillRef: React.RefObject<ReactQuill>,
  editorTitle: string,
  previousContent: TKnowhow | undefined,
  validateKnowhowForm: (newKnowhow: Partial<TKnowhow>) => boolean
) => {
  const router = useRouter();
  const { open } = useModal();
  const { user } = useUserContext();
  const { addKnowhowImage } = useKnowhowImageMutation();
  const { addKnowhow, updateKnowhow } = useKnowhowMutation();
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleSubmit = async () => {
    setIsUploadingImage(true);
    let content = quillRef.current?.getEditor().root.innerHTML || "";

    const base64Images: string[] = content.match(/src="data:image\/[^"]+"/g) || [];
    const urlImages: string[] = content.match(/src="https:\/\/[^"]+"/g) || [];
    const imageFiles: { file: File; base64: string; width: number; height: number }[] = [];
    const imageUrls: string[] = [];

    base64Images.forEach((imageString, index) => {
      const base64Data = imageString.split('"')[1];
      const file = dataURLtoFile(base64Data, `image-${Date.now()}-${index}.png`);
      const imgElement = quillRef.current?.getEditor().root.querySelector(`img[src='${base64Data}']`);
      const width = imgElement ? parseInt(imgElement.getAttribute("width") || "0") : 0;
      const height = imgElement ? parseInt(imgElement.getAttribute("height") || "0") : 0;
      imageFiles.push({ file, base64: base64Data, width, height });
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
          const width = imageFiles[index].width;
          const height = imageFiles[index].height;

          content = content.replace(base64Data, publicUrl);
          content = content.replace(
            `<img src="${publicUrl}"`,
            `<img src="${publicUrl}" width="${width}" height="${height}"`
          );

          imageUrls.push(publicUrl);
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (user) {
      const newKnowhow: Partial<TKnowhow> = {
        title: editorTitle,
        content,
        image_urls: imageUrls,
        user_id: user.userId,
        created_at: previousContent ? previousContent.created_at : new Date().toISOString(),
        updated_at: previousContent ? new Date().toISOString() : null,
        knowhow_postId: previousContent ? previousContent.knowhow_postId : Date.now()
      };

      const isValid = validateKnowhowForm(newKnowhow);
      if (isValid) {
        if (previousContent) {
          await updateKnowhow(newKnowhow);
        } else {
          await addKnowhow(newKnowhow);
        }
      }
    }
    setIsUploadingImage(false);
  };

  const handleOpenSubmitModal = (e: React.FormEvent<HTMLFormElement>) => {
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

  return { handleOpenSubmitModal, handleCancel, isUploadingImage };
};

export default useFormHandlers;
