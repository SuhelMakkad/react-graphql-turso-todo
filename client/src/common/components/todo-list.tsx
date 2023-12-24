import { useTodosQuery } from "@/graphql/hooks/use-todos-query";
import TodoCard, { LoadingCard } from "@/components/todo-card";

const loadingState = (
  <div className="flex flex-col gap-2">
    {new Array(12).fill(0).map((_, index) => (
      <LoadingCard key={index} />
    ))}
  </div>
);

const TodoList = () => {
  const { data, loading } = useTodosQuery();

  if (loading) {
    return loadingState;
  }

  return (
    <div className="flex flex-col gap-2">
      {data?.todos?.map((todo) => todo && <TodoCard key={todo.id} {...todo} />)}
    </div>
  );
};

export default TodoList;
