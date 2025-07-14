import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import {
  addCategory,
  addWorkToCategory,
  deleteWorkFromCategory,
  deleteCategory,
  toggleWorkDone,
} from "../../stores/slices/todoSlice";
import type { IWork } from "../../types/ITodoItem";
import TodoList from "./partials/TodoList";
import NewTodo from "./partials/NewTodo";
import AddTodoModal from "./partials/AddTodoModal";

const Todo: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.todo.categories);

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
    categories.length > 0 ? categories[0].id : null
  );
  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);

  const handleAddCategory = (title: string) => {
    if (!title.trim()) return;
    dispatch(addCategory(title.trim()));
  };

  const handleAddWork = (newWork: Omit<IWork, "id">) => {
    if (!activeCategoryId) return;
    dispatch(
      addWorkToCategory({
        categoryId: activeCategoryId,
        workData: newWork,
      })
    );
    setIsAddTodoModalOpen(false);
  };
  const handleToggleWork = (workId: string) => {
    if (!activeCategoryId) return;
    dispatch(toggleWorkDone({ categoryId: activeCategoryId, workId }));
  };
  const handleDeleteWork = (workId: string) => {
    if (!activeCategoryId) return;
    dispatch(deleteWorkFromCategory({ categoryId: activeCategoryId, workId }));
  };
  const handleDeleteCategory = (categoryId: string) => {
    dispatch(deleteCategory(categoryId));
  };

  const activeCategory = categories.find((cat) => cat.id === activeCategoryId);

  return (
    <div className="fixed top-hheader right-0 left-0 bottom-hsidebar flex flex-col md:left-wsidebar md:bottom-0">
      <div className="flex  items-center gap-x-6 p-4 text-text-primary">
        <button
          className=" flex cursor-pointer items-center gap-x-2 rounded-full border-1 border-text-primary py-2 px-4 font-medium hover:border-primary hover:text-primary"
          onClick={() => setActiveCategoryId(null)}
        >
          <Plus className="h-6" /> Add
        </button>
        <div className="relative flex-1 overflow-hidden">
          <div className=" flex items-center gap-x-4  overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((item) => (
              <div
                key={item.id}
                className={`${
                  activeCategoryId === item.id
                    ? "border-primary text-primary"
                    : "border-border"
                }  cursor-pointer  rounded-full border-1 py-2 px-4   hover:border-primary hover:text-primary hover:bg-surface-hover `}
                onClick={() => setActiveCategoryId(item.id)}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-0 overflow-y-auto md:mx-10 lg:mx-40">
        {activeCategory ? (
          <TodoList
            key={activeCategory.id}
            category={activeCategory}
            onOpenAddTodoModal={() => setIsAddTodoModalOpen(true)}
            onToggleWork={handleToggleWork}
            onDeleteWork={handleDeleteWork}
            onDeleteCategory={handleDeleteCategory}
          />
        ) : (
          <NewTodo onAddCategory={handleAddCategory} />
        )}
      </div>

      {isAddTodoModalOpen && activeCategory && (
        <AddTodoModal
          onClose={() => setIsAddTodoModalOpen(false)}
          onAddTodo={handleAddWork}
        />
      )}
    </div>
  );
};

export default Todo;
