import { Link } from "react-router-dom";
import CreateUserForm from "./components/create-account-form";
import FormFooter from "./components/footer";
import { routes } from "@/utils/route";

const LoginPage = () => {
  return (
    <main className="container">
      <div className="mx-auto my-4 flex h-full min-h-[80vh] w-full max-w-sm flex-col justify-center space-y-6 pb-16">
        <h1 className="mb-4 text-center text-2xl font-semibold tracking-tight">
          Create New Account
        </h1>

        <CreateUserForm />

        <div className="text-center">
          <span>Already have an account? </span>
          <Link to={routes.login} className="underline">
            login
          </Link>
        </div>

        <FormFooter />
      </div>
    </main>
  );
};

export default LoginPage;
