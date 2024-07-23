// import { useMutation } from "@tanstack/react-query";

// const useKnowhowImageMutation = () => {
//   const { mutateAsync: addKnowhowImage } = useMutation({
//     mutationFn: async (formData) => {
//       const response = await fetch("/api/knowhow/image", {
//         method: "POST",
//         body: formData
//       });

//       if (!response.ok) {
//         throw new Error("Error uploading image");
//       }

//       const data = await response.json();
//       return data.url;
//     },
//     onError: (error) => {
//       console.error("Error uploading image:", error);
//     }
//   });

//   return { addKnowhowImage };
// };

// export default useKnowhowImageMutation;
