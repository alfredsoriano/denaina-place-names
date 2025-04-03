import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle d-flex align-items-center">
      <label className="switch">
        <input
          type="checkbox"
          checked={darkTheme}
          onChange={toggleTheme}
          className="toggle-input"
        />
        <span className="slider round"></span>
      </label>
      <p className="px-2">{darkTheme ? "Dark Theme" : "Light Theme"}</p>
    </div>
  );
};

export default ThemeToggle;