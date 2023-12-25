import { CheckCircle2, CircleDashed } from "lucide-react";
import TodoCardActions from "./actions";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/ui";

type TodoCardPops = {
  id: string;
  completed?: boolean | null;
  todo: string;
};

const TodoCard = (todo: TodoCardPops) => {
  return (
    <div className="border shadow-sm p-2 rounded flex gap-2 items-center">
      {todo.completed ? (
        <CheckCircle2 className="h-4 w-4 shrink-0" />
      ) : (
        <CircleDashed className="h-4 w-4 shrink-0" />
      )}

      <span
        className={cn(
          "text-sm md:text-base",
          todo.completed && "truncate line-through"
        )}
      >
        {todo.todo}
      </span>

      <TodoCardActions id={todo.id} completed={todo.completed} />
    </div>
  );
};

export default TodoCard;

export const LoadingCard = () => {
  return (
    <Skeleton className="border shadow-sm p-2 rounded leading-normal h-8" />
  );
};
