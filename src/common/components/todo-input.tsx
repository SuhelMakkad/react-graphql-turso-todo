import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { FormEvent } from "react";

const TodoInput = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const todo = formData.get("todo");

    console.log({ todo });

    form.reset();
  };
  return (
    <section className="space-y-2">
      <h1 className="md:text-xl font-medium">Add New Todo</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <Input name="todo" placeholder="Buy Milk..." className="grow" />
        <Button size={"icon"} title="add todo" className="shrink-0">
          <Plus />
        </Button>
      </form>
    </section>
  );
};

export default TodoInput;
