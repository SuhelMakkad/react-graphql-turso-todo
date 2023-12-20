import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <nav className="py-3 flex gap-2 items-center justify-between">
      <h1 className="font-medium text-lg">Todo List</h1>
      <ModeToggle />
    </nav>
  );
};

export default Navbar;
