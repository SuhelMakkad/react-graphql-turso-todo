import { Loader2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useTodosQuery } from "@/graphql/hooks/use-todos-query";
import { useDeleteTodoMutation } from "@/graphql/hooks/use-delete-todo-mutation";
import { cn } from "@/utils/ui";
import { apolloClient } from "@/graphql/index";

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
  id: string;
  completed?: boolean | null;
  todo: string;
};

const iconClass = "w-4 h-4";

const TodoCard = (todo: TodoCardPops) => {
  const [deleteTodo, { loading }] = useDeleteTodoMutation();

  const handleDelete = async () => {
    try {
      await deleteTodo({ variables: { id: todo.id } });
    } catch (e) {
      console.error(e);
    } finally {
      apolloClient.refetchQueries({
        include: "active",
      });
    }
  };

  return (
    <div className="border shadow-sm p-2 rounded flex gap-2 items-center">
      <span>{todo.completed ? "✅" : "💼"}</span>
      <span className="text-sm md:text-base">{todo.todo}</span>
      <Button
        size={"icon"}
        title="delete todo"
        variant={"destructive"}
        disabled={loading}
        className="h-8 w-8 ml-auto"
        onClick={handleDelete}
      >
        {loading ? (
          <Loader2 className={cn("animate-spin", iconClass)} />
        ) : (
          <Trash className={iconClass} />
        )}
      </Button>
    </div>
  );
};
