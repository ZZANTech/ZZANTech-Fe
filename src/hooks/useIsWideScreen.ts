import { useState, useEffect } from "react";

function useIsWideScreen() {
  const [isWideScreen, setIsWideScreen] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isWideScreen };
}

export default useIsWideScreen;
