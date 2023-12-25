import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useJWTStore } from "@/store/jwt";
import { apolloClient } from "@/graphql/index";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { routes } from "@/utils/route";

const Navbar = () => {
  const navigate = useNavigate();
  const setJWT = useJWTStore((state) => state.setJWT);

  return (
    <nav className="py-3 flex gap-2 items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="font-medium text-lg">Todo List</h1>
        <ModeToggle />
      </div>

      <Button
        variant={"ghost"}
        className="gap-2"
        onClick={() => {
          setJWT(null);
          navigate(routes.login);
          apolloClient.clearStore();
        }}
      >
        <LogOut className="w-4 h-4" />
        Log Out
      </Button>
    </nav>
  );
};

export default Navbar;
