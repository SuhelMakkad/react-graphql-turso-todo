import { Link } from "react-router-dom";

const linkClass =
  "whitespace-nowrap underline underline-offset-4 hover:text-primary";

const FormFooter = () => {
  return (
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
  );
};

export default FormFooter;
