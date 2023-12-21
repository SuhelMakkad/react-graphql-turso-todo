import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useTodosQuery } from "@/graphql/hooks/use-todos-query";

const TodoList = () => {
  const { data, loading } = useTodosQuery();

  if (loading) {
    return "loading...";
  }

  return (
    <div className="flex flex-col gap-2">
      {data?.todos?.map((todo) => todo && <TodoCard key={todo.id} {...todo} />)}
    </div>
  );
};

export default TodoList;

type TodoCardPops = {
  completed?: boolean | null;
  todo: string;
};

const TodoCard = (todo: TodoCardPops) => {
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
