import { useState } from "react";
import { useTranslation } from "react-i18next";

interface NewTodoProps {
  onAddCategory: (title: string) => void;
}

const NewTodo = ({ onAddCategory }: NewTodoProps) => {
  const { t } = useTranslation();
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddCategory(categoryName);
    setCategoryName("");
  };

  return (
    <div className="flex h-full flex-col items-center justify-center p-4 text-text-primary">
      <h2 className="text-2xl font-bold mb-4">
        {t("page.todo.create_new_category")}
      </h2>
      <p className="text-text-secondary mb-8">
        {t("page.todo.create_category_desc")}
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          placeholder={t("page.todo.category_name_placeholder")}
          autoFocus={true}
          className="w-full rounded-md border-2 border-border bg-background p-3 text-center text-xl outline-none focus:border-primary"
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          spellCheck="false"
        />
        <button
          type="submit"
          disabled={categoryName.trim() === ""}
          className="mt-4 w-full cursor-pointer rounded-lg bg-primary py-3 px-4 font-semibold text-white transition-colors hover:bg-primary/80 disabled:cursor-not-allowed disabled:bg-primary/40"
        >
          {t("page.todo.create_button")}
        </button>
      </form>
    </div>
  );
};

export default NewTodo;
