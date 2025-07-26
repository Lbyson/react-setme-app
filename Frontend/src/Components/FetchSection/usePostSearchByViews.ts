import { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface Post {
  id: number;
  title: string;
  views: number;
  [key: string]: any;
}

interface UsePostSearchByViewsReturn {
  selector: string;
  setSelector: Dispatch<SetStateAction<string>>;
  enterView: string;
  setEnterView: Dispatch<SetStateAction<string>>;
  handleSubmitViews: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  resultViews: Post[] | null;
}

export default function usePostSearchByViews(
  setError: Dispatch<SetStateAction<string>>,
): UsePostSearchByViewsReturn {
  const [selector, setSelector] = useState<string>("eq");

  const [enterView, setEnterView] = useState<string>("");
  const [resultViews, setResultViews] = useState<Post[] | null>(null);

  const handleSubmitViews = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:3000/posts?views_${selector}=${enterView}`,
      );

      if (!res.ok) {
        const errorMessage =
          res.status === 404
            ? "Пост по заданному индикатору не найден"
            : "Что-то пошло не так";
        throw new Error(errorMessage);
      }

      const json: Post[] = await res.json();

      setResultViews(json);
    } catch (error: any) {
      setError(error.message || "Ошибка запроса");
    }
  };

  return {
    selector,
    setSelector,
    enterView,
    setEnterView,
    handleSubmitViews,
    resultViews,
  };
}
