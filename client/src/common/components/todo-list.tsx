import { useTodosQuery } from "@/graphql/hooks/use-todos-query";
import TodoCard from "@/components/todo-card";

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
