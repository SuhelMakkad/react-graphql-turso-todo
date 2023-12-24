import { useTodosQuery } from "@/graphql/hooks/use-todos-query";
import TodoCard, { LoadingCard } from "./todo-card";

const loadingState = (
  <div className="flex flex-col gap-2">
    {new Array(12).fill(0).map((_, index) => (
      <LoadingCard key={index} />
    ))}
  </div>
);

const emptyState = (
  <div className="flex text-muted-foreground h-[30vh] justify-center flex-col gap-2 items-center">
    <div className="text-center">
      <span className="text-xl font-medium">All Set!</span>
      <p className="italic">No pending item</p>
    </div>
  </div>
);

const TodoList = () => {
  const { data, loading } = useTodosQuery();

  if (loading) {
    return loadingState;
  }

  if (!data?.todos?.length) {
    return emptyState;
  }

  return (
    <div className="flex flex-col gap-2">
      {data.todos.map((todo) => todo && <TodoCard key={todo.id} {...todo} />)}
    </div>
  );
};

export default TodoList;
