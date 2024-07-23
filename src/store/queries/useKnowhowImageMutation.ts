import { uploadImages } from "@/apis/knowhow";
import { useMutation } from "@tanstack/react-query";

const useKnowhowImageMutation = () => {
  const { mutateAsync: addKnowhowImage } = useMutation({
    mutationFn: (formData: FormData) => uploadImages(formData)
  });

  return { addKnowhowImage };
};

export default useKnowhowImageMutation;
