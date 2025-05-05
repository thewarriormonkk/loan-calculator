import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
    >
      <App />
    </Router>
  </StrictMode>,
)
