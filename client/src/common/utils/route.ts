export const routes = {
  home: "/",
  login: "/auth/login",
  signUp: "/auth/sign-up",
};

export const apiBaseUrl =
  import.meta.env.VITE_ENV === "dev"
    ? "http://localhost:8000"
    : "https://react-graphql-turso-todo.vercel.app";
