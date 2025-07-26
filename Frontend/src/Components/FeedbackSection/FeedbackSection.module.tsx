import { ChangeEvent, KeyboardEvent, useState } from "react";
import Button from "@/hooks/Button/Button";

interface FeedbackSectionProps {
  theme: string;
}

interface FormState {
  name: string;
  hasError: boolean;
  reason: string;
}

export default function FeedbackSection({ theme }: FeedbackSectionProps) {
  const isBright = theme === "bright-theme";

  const [show, setShow] = useState<boolean>(false);
  const [written, setWritten] = useState<boolean>(false);

  const [inputEnterValue, setInputEnterValue] = useState<string>("");
  const [inputShowValue, setInputShowValue] = useState<string>("");

  const [form, setForm] = useState<FormState>({
    name: "",
    hasError: false,
    reason: "error",
  });

  const inputClass = isBright ? "input-bright" : "input-dark";
  const titleClass = isBright ? "title-bright" : "title-dark";
  const selectClass = isBright ? "select-bright" : "select-dark";
  const sectionClass = isBright
    ? "feedback-section bright"
    : "feedback-section dark";

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      name: value,
      hasError: value.trim() === "",
    }));
  };

  const handleReasonChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      reason: value,
    }));
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    setter: (value: boolean) => void,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setter(true);
    }
  };

  return (
    <section className={sectionClass}>
      <h3 className={titleClass}>Обратная связь</h3>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="name">Ваше имя</label>
        <input
          type="text"
          id="name"
          className={inputClass}
          value={form.name}
          placeholder="Введите имя..."
          onChange={handleInputChange}
          autoComplete="off"
        />

        <label htmlFor="reasonId">Причина обращения</label>
        <select
          name="reason"
          id="reasonId"
          className={selectClass}
          value={form.reason}
          onChange={handleReasonChange}
        >
          <option value="error">Ошибка</option>
          <option value="help">Нужна помощь</option>
          <option value="suggest">Предложение</option>
        </select>

        <pre>{JSON.stringify(form, null, 2)}</pre>

        <Button disabled={form.hasError} isActive={!form.hasError}>
          Отправить
        </Button>
      </form>

      <div>
        <h3 className={titleClass}>
          Введённый текст (Enter 1): {written ? inputEnterValue : ""}
        </h3>
        <input
          type="text"
          className={inputClass}
          placeholder="Нажми Enter для отображения"
          onKeyDown={(e) => handleKeyDown(e, setWritten)}
          onChange={(e) => setInputEnterValue(e.target.value)}
          autoComplete="off"
        />
      </div>

      <h3 className={titleClass}>
        Введённый текст (Enter 2): {show ? inputShowValue : ""}
      </h3>
      <input
        type="text"
        className={inputClass}
        placeholder="Нажми Enter для отображения"
        onKeyDown={(e) => handleKeyDown(e, setShow)}
        onChange={(e) => setInputShowValue(e.target.value)}
        autoComplete="off"
      />
    </section>
  );
}
