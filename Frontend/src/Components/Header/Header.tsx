import "@/Components/Header/Header.scss";
import HeaderButton from "@/Components/Header/HeaderButton.jsx";
import { useEffect, useState } from "react";
import "/ThemeImages/sun.png";
import "/ThemeImages/moon.png";

interface HeaderProps {
  theme: "dark-theme" | "bright-theme";
  setThemeState: (theme: "dark-theme" | "bright-theme") => void;
}

function Header({ theme, setThemeState }: HeaderProps) {
  const toggleTheme = () => {
    setThemeState(theme === "dark-theme" ? "bright-theme" : "dark-theme");
  };

  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header">
      <h3>seTme</h3>
      <div>
        <HeaderButton onClick={toggleTheme} isDark={theme}>
          {theme === "dark-theme" ? (
            <img
              src="/ThemeImages/sun.png"
              alt="Тема"
              width="30rem"
              height="30rem"
            />
          ) : (
            <img
              src="/ThemeImages/moon.png"
              alt="Тема"
              width="600"
              height="599"
            />
          )}
        </HeaderButton>
        <span
          className="time"
          style={{
            color: theme === "dark-theme" ? "white" : "black",
          }}
        >
          Time: {date.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}

export default Header;
