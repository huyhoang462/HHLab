import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./i18n.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";

const queryClinet = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClinet}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
