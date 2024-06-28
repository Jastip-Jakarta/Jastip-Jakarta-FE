import { useEffect, useState } from "react";

function useTitle() {
  const [title, setTitle] = useState("");

  const changeTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  useEffect(() => {
    document.title = title;
    return () => {
      document.title = "Jastip Jakarta";
    };
  });

  return changeTitle;
}

export default useTitle;
