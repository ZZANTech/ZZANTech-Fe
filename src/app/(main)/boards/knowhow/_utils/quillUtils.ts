export const getModules = (imageHandler: () => void) => ({
  toolbar: {
    container: [[{ header: [1, 2, 3, 4, 5, false] }], ["bold"], ["link", "image"]],
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

export const formats = [
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

export const dataURLtoFile = (dataurl: string, filename: string): File => {
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
