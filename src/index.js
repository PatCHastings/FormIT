import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AppProviders from "./AppProviders";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

// Render the app
root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);