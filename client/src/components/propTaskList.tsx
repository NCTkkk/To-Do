import type { Task } from "../types/Task";

interface TaskCardProps {
  index: number;
  task: Task;
  onRowClick: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}

export const TaskCard = ({
  index,
  onRowClick,
  onDelete,
  onUpdate,
  task,
}: TaskCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  const handleUpdate = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newTitle = prompt("Enter new title", task.title);
    if (newTitle !== null && newTitle.trim() !== "") {
      onUpdate(task.id, newTitle);
    }
  };

  return (
    <div
      className="flex flex-row gap-4 justify-between p-4 hover:bg-slate-200 cursor-pointer"
      onClick={() => onRowClick(task.id)}
    >
      <p>{index + 1}</p>
      <p className={`${task.completed ? "line-through" : undefined}`}>
        {task.title}
      </p>
      <div className="flex flex-row gap-4">
        <i
          className="fa-solid fa-pencil cursor-pointer hover:text-blue-500"
          onClick={handleUpdate}
        ></i>
        <i
          className="fa-solid fa-trash cursor-pointer hover:text-red-500"
          onClick={handleDelete}
        ></i>
      </div>
    </div>
  );
};
