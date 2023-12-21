import type { FormEvent } from "react";

import { Loader2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { apolloClient } from "@/graphql/index";
import { useAddTodoMutation } from "@/graphql/hooks/use-add-todo-mutation";
import { cn } from "@/utils/ui";

const iconClass = "h-4 w-4";

const TodoInput = () => {
  const [addTodo, { loading }] = useAddTodoMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const todo = formData.get("todo") as string;

    if (!todo) return;

    try {
      await addTodo({
        variables: {
          todo,
        },
      });
      form.reset();
    } catch (e) {
      console.error(e);
    } finally {
      apolloClient.refetchQueries({
        include: "active",
      });
    }
  };

  return (
    <section className="space-y-2">
      <h1 className="md:text-xl font-medium">Add New Todo</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <Input name="todo" placeholder="Buy Milk..." className="grow" />
        <Button
          disabled={loading}
          size={"icon"}
          title="add todo"
          className="shrink-0"
        >
          {loading ? (
            <Loader2 className={cn("animate-spin", iconClass)} />
          ) : (
            <Plus className={iconClass} />
          )}
        </Button>
      </form>
    </section>
  );
};

export default TodoInput;
