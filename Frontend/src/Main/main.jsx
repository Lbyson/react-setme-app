import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/Main/index.css";
import Root from "@/Main/Root.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
