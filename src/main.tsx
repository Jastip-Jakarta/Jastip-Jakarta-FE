import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/globals.css";
import App from "./routes";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./utils/context/auth";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster position="bottom-right" />
      <App />
    </AuthProvider>
  </React.StrictMode>
);
