import React from "react";
import ThemeContextProvider from "./context/themeContext";
import { AuthProvider } from "./context/AuthContext";
import { RequestsProvider } from "./context/RequestContext";

function AppProviders({ children }) {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        <RequestsProvider>{children}</RequestsProvider>
      </AuthProvider>
    </ThemeContextProvider>
  );
}

export default AppProviders;
