import { Trash } from "lucide-react";
import { Button } from "./ui/button";

export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

export type TodoListProps = {
  todos: Todo[];
};

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;

type TodoCardPops = {
  todo: Todo;
};

const TodoCard = ({ todo }: TodoCardPops) => {
  return (
    <div className="border shadow-sm p-2 rounded flex gap-2 items-center">
      <span>{todo.completed ? "✅" : "💼"}</span>
      <span className="text-sm md:text-base">{todo.todo}</span>
      <Button
        size={"icon"}
        title="delete todo"
        variant={"destructive"}
        className="h-8 w-8 ml-auto"
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
};
