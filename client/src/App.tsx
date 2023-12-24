import { routes } from "@/utils/route";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("@/pages/home"));
const LoginPage = lazy(() => import("@/pages/auth/login"));
const SignUpPage = lazy(() => import("@/pages/auth/sign-up"));

const routesMap = [
  {
    path: routes.home,
    Component: HomePage,
  },
  {
    path: routes.login,
    Component: LoginPage,
  },
  {
    path: routes.signUp,
    Component: SignUpPage,
  },
];

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routesMap.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Suspense>
                <route.Component />
              </Suspense>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
