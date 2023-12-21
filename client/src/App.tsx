import Navbar from "@/components/navbar";
import TodoInput from "@/components/todo-input";
import TodoList from "@/components/todo-list";

const App = () => {
  return (
    <>
      <Navbar />

      <main className="space-y-8 my-4">
        <TodoInput />

        <TodoList />
      </main>
    </>
  );
};

export default App;
