import "@/Components/Header/HeaderButton.scss";
import React from "react";

interface HeaderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isDark: "dark-theme" | "bright-theme";
}

function HeaderButton({ children, isDark, ...props }: HeaderButtonProps) {
  return (
    <button
      {...props}
      className={isDark === "dark-theme" ? "button" : "button bright"}
      type="button"
    >
      {children}
    </button>
  );
}

export default HeaderButton;
