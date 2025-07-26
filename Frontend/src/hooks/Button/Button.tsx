import "@/hooks/Button/Button.scss";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isActive?: boolean;
}

function Button({
  children,
  isActive = false,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${className} button${isActive ? " active" : ""}`.trim();

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}

export default Button;
