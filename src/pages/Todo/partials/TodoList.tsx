import { Plus, Trash2 } from "lucide-react";
import type { ICategory } from "../../../types/ITodoItem";
import { useTranslation } from "react-i18next";
import TodoItem from "./TodoItem";

interface TodoListProps {
  category: ICategory;
  onOpenAddTodoModal: () => void;
  onToggleWork: (workId: string) => void;
  onDeleteWork: (workId: string) => void;
  onDeleteCategory: (categoryId: string) => void;
}

const TodoList = ({
  category,
  onOpenAddTodoModal,
  onToggleWork,
  onDeleteWork,
  onDeleteCategory,
}: TodoListProps) => {
  const { t } = useTranslation();

  const handleDeleteCategory = () => {
    onDeleteCategory(category.id);
  };
  return (
    <div className="flex h-full flex-col px-4 text-text-primary">
      <div className="flex  gap-x-6 items-center mb-2">
        <p className="flex-shrink-0 text-xl ">{category.title}</p>
        <button
          className="flex items-center cursor-pointer hover:text-danger"
          onClick={handleDeleteCategory}
        >
          <Trash2 className="h-5" />
        </button>
      </div>
      <div className="flex-1 flex  flex-col gap-y-4  overflow-y-auto py-3 px-4 [scrollbar-height]:none] [&::-webkit-scrollbar]:hidden">
        {category.works.length > 0 ? (
          category.works.map((item) => (
            <TodoItem
              key={item.id}
              work={item}
              onToggleDone={onToggleWork}
              onDelete={onDeleteWork}
            />
          ))
        ) : (
          <p className="text-center text-text-secondary ">
            {t("page.todo.no_tasks")}
          </p>
        )}
      </div>
      <button
        onClick={onOpenAddTodoModal}
        className=" flex-shrink-0  cursor-pointer hover:scale-105 mt-3 mb-4 mx-auto  flex items-center py-2 px-3 rounded-full bg-primary/30 hover:bg-primary/70"
      >
        <Plus className="h-5" />
        <p className=" whitespace-nowrap">{t("page.todo.add_todo")}</p>
      </button>
    </div>
  );
};

export default TodoList;
