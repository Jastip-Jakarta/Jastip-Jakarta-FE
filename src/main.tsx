import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/globals.css";
import App from "./routes";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./utils/context/auth";
import { ModalProvider } from "./utils/context/modal";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModalProvider>
      <AuthProvider>
        <Toaster position="bottom-right" />
        <App />
      </AuthProvider>
    </ModalProvider>
  </React.StrictMode>
);
