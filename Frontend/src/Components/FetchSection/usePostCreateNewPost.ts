import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useSuccess } from "./useSuccess";

interface UsePostCreateNewPostReturn {
  inputCreateTitle: string;
  inputCreateIdentifier: string;
  setInputCreateIdentifier: Dispatch<SetStateAction<string>>;
  setInputCreateTitle: Dispatch<SetStateAction<string>>;
  handleSubmitCreate: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  success: string;
}

export default function usePostCreateNewPost(
  setError: Dispatch<SetStateAction<string>>,
): UsePostCreateNewPostReturn {
  const [success, setSuccess] = useState<string>("");

  const [inputCreateTitle, setInputCreateTitle] = useState<string>("");
  const [inputCreateIdentifier, setInputCreateIdentifier] =
    useState<string>("");

  useSuccess(success, setSuccess);

  const handleSubmitCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!inputCreateTitle || !inputCreateIdentifier) {
      setError("Заполните все поля");
      return;
    }

    try {
      const checkRes = await fetch(
        `http://localhost:3000/posts?id=${inputCreateIdentifier}`,
      );
      const existingPosts = await checkRes.json();

      if (existingPosts.length > 0) {
        setError("Пост с таким индификатором уже сушествет");
        return;
      }

      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: inputCreateIdentifier,
          title: inputCreateTitle,
          views: 0,
          isCompleted: false,
        }),
      });

      if (!response.ok) throw new Error("Ошибка при создании поста");

      setSuccess("Пост создан успешно");
      setInputCreateTitle("");
      setInputCreateIdentifier("");
    } catch (error: any) {
      setError(error.message || "Что то пошло не так");
    }
  };

  return {
    inputCreateTitle,
    inputCreateIdentifier,
    setInputCreateIdentifier,
    setInputCreateTitle,
    handleSubmitCreate,
    success,
  };
}
