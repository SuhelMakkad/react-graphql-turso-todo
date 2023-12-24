import React from "react";
import ReactDOM from "react-dom/client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ApolloGraphqlProvider } from "@/graphql/index";
import App from "./App";

import "@/styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloGraphqlProvider>
      <ThemeProvider>
        <App />
        <Toaster />
      </ThemeProvider>
    </ApolloGraphqlProvider>
  </React.StrictMode>
);
