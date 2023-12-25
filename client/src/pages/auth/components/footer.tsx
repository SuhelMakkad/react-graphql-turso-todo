import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { routes } from "@/utils/route";

const linkClass =
  "whitespace-nowrap underline underline-offset-4 hover:text-primary";

const FormFooter = () => {
  return (
    <div className="space-y-4">
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link to={"#"} className={linkClass}>
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to={"#"} className={linkClass}>
          Privacy Policy
        </Link>
        .
      </p>

      <div className="text-sm text-muted-foreground text-center">
        <Button asChild variant={"ghost"}>
          <Link to={routes.login + "?dummy=true"}>
            <span>Load dummy account for test</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FormFooter;
