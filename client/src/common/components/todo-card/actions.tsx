import { useState } from "react";

import { useDeleteTodoMutation } from "@/graphql/hooks/use-delete-todo-mutation";
import { apolloClient } from "@/graphql/index";

import {
  CheckCircle2,
  CircleDashed,
  Loader2,
  LucideIcon,
  LucideProps,
  MoreVertical,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/ui";

export type TodoCardActionsProps = {
  id: string;
  completed?: boolean | null;
};

type LoadingState = "deleting" | "updating" | null;

const TodoCardActions = ({ id, completed }: TodoCardActionsProps) => {
  const [loadingState, setLoadingState] = useState<LoadingState>(null);
  const [deleteTodo] = useDeleteTodoMutation();

  const handleDelete = async () => {
    try {
      setLoadingState("deleting");
      await deleteTodo({ variables: { id: id } });
    } catch (e) {
      console.error(e);
    } finally {
      await apolloClient.refetchQueries({
        include: "active",
      });
      setLoadingState(null);
    }
  };

  const deleting = loadingState === "deleting";
  const updating = loadingState === "updating";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          title="Options"
          className="h-5 w-5 ml-auto"
        >
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 mr-4">
        {completed ? (
          <DropdownMenuItem disabled={updating}>
            <Icon
              className="mr-2 h-4 w-4"
              isLoading={updating}
              Icon={CircleDashed}
            />
            <span>Pending</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem disabled={updating}>
            <Icon
              className="mr-2 h-4 w-4"
              isLoading={updating}
              Icon={CheckCircle2}
            />
            <span>Done</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem disabled={deleting} onClick={handleDelete}>
          <Icon className="mr-2 h-4 w-4" isLoading={deleting} Icon={Trash} />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TodoCardActions;

type IconProps = React.PropsWithChildren<
  LucideProps & {
    isLoading: boolean;
    Icon: LucideIcon;
  }
>;

const Icon = ({ isLoading, Icon, className, ...props }: IconProps) => {
  if (isLoading) {
    return <Loader2 className={cn("animate-spin", className)} {...props} />;
  }

  return <Icon className={className} {...props} />;
};
