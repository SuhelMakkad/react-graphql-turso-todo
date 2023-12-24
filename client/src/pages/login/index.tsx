import { Link, useSearchParams } from "react-router-dom";
import { AlertCircleIcon } from "lucide-react";
import LoginFrom from "./components/login-form";
import FormFooter from "./components/footer";

const LoginPage = () => {
  const [searchParams] = useSearchParams();

  const error = searchParams.get("error");
  const next = searchParams.get("next");

  const errorMessage = error ? decodeURIComponent(error) : "";
  const nextPage = next ? decodeURIComponent(next) : "/";

  return (
    <main className="container">
      <div className="mx-auto my-4 flex h-full min-h-[80vh] w-full max-w-sm flex-col justify-center space-y-6 pb-16">
        <h1 className="text-center text-2xl font-semibold tracking-tight">
          Sign In
        </h1>

        {!!errorMessage && (
          <div className="flex items-center gap-2 rounded-lg border border-destructive p-4 text-sm text-destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <p className="">{errorMessage}</p>
          </div>
        )}

        <LoginFrom nextPath={nextPage} />

        <div className="text-center">
          <span>Don't have an account? </span>
          <Link to={"#"} className="underline">
            create account
          </Link>
        </div>

        <FormFooter />
      </div>
    </main>
  );
};

export default LoginPage;
