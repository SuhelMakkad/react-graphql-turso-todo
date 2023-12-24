import * as React from "react";

import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/utils/ui";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const ICON_CLASS = "w-5 h-5 text-inherit opacity-60 shrink-0 text-sm";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "password", ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    return (
      <div
        className={cn(
          "flex h-10 w-full gap-1 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
          !isPasswordVisible && "font-[Verdana] tracking-widest",
          className
        )}
      >
        <input
          ref={ref}
          type={isPasswordVisible ? "text" : type}
          className="grow border-none outline-none placeholder-shown:font-sans"
          {...props}
        />
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? (
            <Eye className={ICON_CLASS} />
          ) : (
            <EyeOff className={ICON_CLASS} />
          )}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
