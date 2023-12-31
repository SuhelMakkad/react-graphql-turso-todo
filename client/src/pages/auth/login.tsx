import { Link, useSearchParams } from "react-router-dom";
import LoginFrom from "./components/login-form";
import ErrorAlert from "./components/error-alert";
import FormFooter from "./components/footer";
import { routes } from "@/utils/route";

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const dummy = searchParams.get("dummy");

  return (
    <main className="container">
      <div className="mx-auto my-4 flex h-full min-h-[80vh] w-full max-w-sm flex-col justify-center space-y-6 pb-16">
        <h1 className="text-center text-2xl font-semibold tracking-tight">
          Sign In
        </h1>

        <ErrorAlert />

        <LoginFrom key={searchParams.get("dummy")} dummy={dummy !== null} />

        <div className="text-center">
          <span>Don't have an account? </span>
          <Link to={routes.signUp} className="underline">
            create account
          </Link>
        </div>

        <FormFooter />
      </div>
    </main>
  );
};

export default LoginPage;
