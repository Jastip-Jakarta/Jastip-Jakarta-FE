import { useEffect } from "react";

function useTitle() {
  const changeTitle = (newTitle: string) => {
    document.title = newTitle;
  };

  useEffect(() => {
    return () => {
      document.title = "Jastip Jakarta";
    };
  });

  return changeTitle;
}

export default useTitle;
