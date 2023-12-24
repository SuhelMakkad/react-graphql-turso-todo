import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ThemeProvider } from "@/components/theme-provider";
import { ApolloGraphqlProvider } from "@/graphql/index";

import "@/styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloGraphqlProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ApolloGraphqlProvider>
  </React.StrictMode>
);
