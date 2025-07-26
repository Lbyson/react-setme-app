import "@/Components/FetchSection/FetchSection.scss"; // обычный импорт без modules
import { ChangeEvent, FormEvent, useState } from "react";
import usePostSearchByIdentifier from "@/Components/FetchSection/usePostSearchByIdentifier";
import usePostCreateNewPost from "@/Components/FetchSection/usePostCreateNewPost";
import usePostSearchByViews from "@/Components/FetchSection/usePostSearchByViews";

interface Post {
  id: number;
  title: string;
  views?: number;
}

export default function FetchSection() {
  const [error, setError] = useState<string>("");

  const {
    post,
    inputId,
    isCompleted,
    setInputId,
    handleSubmit,
    toggleCompleted,
  }: {
    post: Post | null;
    inputId: string;
    isCompleted: boolean;
    setInputId: (value: string) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    toggleCompleted: () => void;
  } = usePostSearchByIdentifier(setError);

  const {
    inputCreateTitle,
    inputCreateIdentifier,
    setInputCreateIdentifier,
    setInputCreateTitle,
    handleSubmitCreate,
    success,
  }: {
    inputCreateTitle: string;
    inputCreateIdentifier: string;
    setInputCreateIdentifier: (value: string) => void;
    setInputCreateTitle: (value: string) => void;
    handleSubmitCreate: (e: FormEvent<HTMLFormElement>) => void;
    success: string;
  } = usePostCreateNewPost(setError);

  const {
    selector,
    setSelector,
    enterView,
    setEnterView,
    handleSubmitViews,
    resultViews,
  }: {
    selector: string;
    setSelector: (value: string) => void;
    enterView: string;
    setEnterView: (value: string) => void;
    handleSubmitViews: (e: FormEvent<HTMLFormElement>) => void;
    resultViews: Post[] | null;
  } = usePostSearchByViews(setError);

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="title">
          Enter the identifier by which you wanna find the post:
        </label>

        <input
          type="number"
          placeholder="Enter a number"
          value={inputId}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setInputId(event.target.value)
          }
        />

        <button type="submit">Загрузить Post по ID</button>
      </form>

      <form className="form" onSubmit={handleSubmitCreate}>
        <label htmlFor="title">Title:</label>

        <input
          type="text"
          name="title"
          value={inputCreateTitle}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setInputCreateTitle(event.target.value)
          }
        />

        <label htmlFor="title">Identifier:</label>

        <input
          type="number"
          name="id"
          value={inputCreateIdentifier}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setInputCreateIdentifier(event.target.value)
          }
        />

        <button type="submit">Создать пост</button>
      </form>

      <div className="selectWrapper">
        <select
          name="sign"
          id="signId"
          value={selector}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            setSelector(event.target.value)
          }
        >
          <option value="eq">=</option>
          <option value="gt">&gt;</option>
          <option value="gte">&gt;=</option>
          <option value="lt">&lt;</option>
          <option value="lte">&lt;=</option>
        </select>
      </div>

      <form className="form" onSubmit={handleSubmitViews}>
        <label htmlFor="title">Пост с просмотрамии от :</label>

        <input
          type="number"
          placeholder="Enter a number"
          value={enterView}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setEnterView(event.target.value)
          }
        />

        <button type="submit">Enter</button>
      </form>

      <div className="result">
        {post && (
          <>
            <input
              id={`post-${post.id}`}
              type="checkbox"
              checked={isCompleted}
              onChange={toggleCompleted}
            />
            <label htmlFor={`post-${post.id}`}>{post.title}</label>
          </>
        )}
        {resultViews && (
          <ul>
            {resultViews.map(({ id, title, views }) => (
              <li key={id}>
                Название: {title}, а вот просмотров {views}
              </li>
            ))}
          </ul>
        )}
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
