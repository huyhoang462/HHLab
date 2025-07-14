import { X } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import type { IWork } from "../../../types/ITodoItem";

interface AddTodoModalProps {
  onClose: () => void;
  onAddTodo: (newWorkData: Omit<IWork, "id">) => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({ onClose, onAddTodo }) => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !deadline) {
      alert(t("validation.fill_all_fields"));
      return;
    }

    const newWorkData: Omit<IWork, "id"> = {
      name: name.trim(),
      deadline: new Date(deadline),
      isDone: false,
    };

    onAddTodo(newWorkData);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-xl bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <h3 className="text-lg font-semibold text-text-primary">
            {t("page.todo.add_new_task_title")}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 cursor-pointer text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
            aria-label={t("global.buttons.close")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div>
            <label
              htmlFor="task-name"
              className="block text-sm font-medium text-text-secondary"
            >
              {t("page.todo.task_name")}
            </label>
            <input
              id="task-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-border bg-background p-2 text-text-primary outline-none focus:border-primary focus:ring-primary"
              placeholder={t("page.todo.task_name_placeholder")}
              autoFocus
            />
          </div>
          <div>
            <label
              htmlFor="task-deadline"
              className="block text-sm font-medium text-text-secondary"
            >
              {t("page.todo.deadline")}
            </label>
            <input
              id="task-deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="mt-1 block w-full rounded-md border border-border bg-background p-2 text-text-primary outline-none focus:border-primary focus:ring-primary"
            />
          </div>

          <div className="flex justify-end gap-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg bg-surface-hover px-4 py-2 font-semibold text-text-primary transition-colors hover:bg-border"
            >
              {t("global.buttons.cancel")}
            </button>
            <button
              type="submit"
              disabled={!name.trim() || !deadline}
              className="cursor-pointer rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-colors hover:bg-primary/80 disabled:cursor-not-allowed disabled:bg-primary/30"
            >
              {t("global.buttons.add")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;
