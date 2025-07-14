import type { IWork } from "../../../types/ITodoItem";
import { Circle, CircleCheck, Trash2 } from "lucide-react";

interface WorkProp {
  work: IWork;
  onToggleDone: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ work, onToggleDone, onDelete }: WorkProp) => {
  const dateNow = new Date();

  const handleToggle = () => {
    onToggleDone(work.id);
  };

  const handleDelete = () => {
    onDelete(work.id);
  };

  return (
    <div
      className={`${
        work.isDone
          ? "bg-success/90"
          : work.deadline < dateNow
          ? "bg-danger/90"
          : "bg-warning/90"
      } flex justify-between items-center  p-2 rounded-md hover:scale-101 transition-transform duration-200`}
    >
      <div className=" flex items-center overflow-hidden">
        <button onClick={handleToggle} className="flex-shrink-0">
          {work.isDone ? (
            <CircleCheck className="h-5 mr-2 cursor-pointer" />
          ) : (
            <Circle className="h-5 mr-2 cursor-pointer" />
          )}
        </button>
        <p className={` ${work.isDone ? " line-through" : ""} truncate `}>
          {work.name}
        </p>
      </div>
      <div className="flex items-center flex-shrink-0">
        <p className="text-text text-sm mr-2">
          {work.deadline.toLocaleDateString("vi")}
        </p>
        <button onClick={handleDelete}>
          <Trash2 className="h-5 cursor-pointer text-text-primary/80 hover:text-text-primary" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
