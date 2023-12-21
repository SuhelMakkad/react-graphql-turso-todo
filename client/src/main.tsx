import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { ApolloGraphqlProvider } from "./common/graphql/index.tsx";

import "./common/styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloGraphqlProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ApolloGraphqlProvider>
  </React.StrictMode>
);
