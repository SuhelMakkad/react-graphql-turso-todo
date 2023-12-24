import { CheckCircle2, CircleDashed } from "lucide-react";
import TodoCardActions from "./actions";

type TodoCardPops = {
  id: string;
  completed?: boolean | null;
  todo: string;
};

const TodoCard = (todo: TodoCardPops) => {
  return (
    <div className="border shadow-sm p-2 rounded flex gap-2 items-center">
      {todo.completed ? (
        <CheckCircle2 className="h-4 w-4" />
      ) : (
        <CircleDashed className="h-4 w-4" />
      )}

      <span className="text-sm md:text-base">{todo.todo}</span>
      <TodoCardActions id={todo.id} completed={todo.completed} />
    </div>
  );
};

export default TodoCard;
