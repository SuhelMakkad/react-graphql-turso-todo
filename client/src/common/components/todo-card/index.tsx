import { CheckCircle2, CircleDashed } from "lucide-react";
import { useDeleteTodoMutation } from "@/graphql/hooks/use-delete-todo-mutation";
import { apolloClient } from "@/graphql/index";
import TodoCardActions from "./actions";

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
      {todo.completed ? (
        <CheckCircle2 className="h-4 w-4" />
      ) : (
        <CircleDashed className="h-4 w-4" />
      )}
      <span className="text-sm md:text-base">{todo.todo}</span>

      <TodoCardActions />
    </div>
  );
};

export default TodoCard;
