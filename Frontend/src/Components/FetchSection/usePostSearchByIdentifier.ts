import { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface Post {
  id: number;
  title: string;
  views: number;
  isCompleted: boolean;
  [key: string]: any; // если есть дополнительные поля
}

interface UsePostSearchByIdentifierReturn {
  post: Post | null;
  inputId: string;
  isCompleted: boolean;
  setInputId: Dispatch<SetStateAction<string>>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  toggleCompleted: () => void;
}

export default function usePostSearchByIdentifier(
  setError: Dispatch<SetStateAction<string>>,
): UsePostSearchByIdentifierReturn {
  const [post, setPost] = useState<Post | null>(null);
  const [inputId, setInputId] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputId || Number(inputId) <= 0) {
      setPost(null);
      setError("Введите ID больше 0");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/posts/${inputId}`);

      if (!res.ok) {
        const errorMessage =
          res.status === 404
            ? "Пост по заданному индикатору не найден"
            : "Что-то пошло не так";
        throw new Error(errorMessage);
      }

      const json: Post = await res.json();
      setPost(json);
      setIsCompleted(json.isCompleted || false);
      setError("");

      await fetch(`http://localhost:3000/posts/${inputId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ views: json.views + 1 }),
      });

      setPost((prev) =>
        prev ? { ...prev, views: (prev.views ?? 0) + 1 } : prev,
      );
    } catch (err: any) {
      setPost(null);
      setError(err.message || "Ошибка запроса");
    }
  };

  const toggleCompleted = () => {
    const newValue = !isCompleted;

    fetch(`http://localhost:3000/posts/${inputId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCompleted: newValue }),
    })
      .then((res) => res.json())
      .then((json: Post) => {
        setIsCompleted(json.isCompleted);
      })
      .catch(() => {
        setError("Ошибка при обновлении");
      });
  };

  return {
    post,
    inputId,
    isCompleted,
    setInputId,
    handleSubmit,
    toggleCompleted,
  };
}
