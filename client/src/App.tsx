import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("@/pages/home"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
