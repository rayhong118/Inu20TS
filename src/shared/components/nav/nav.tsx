import React from "react";
import "./nav.scss";
import { useStateValue } from "../../tools/state";
import { ACTION_CHANGE_THEME, THEME_DARK, THEME_LIGHT } from "../../constants/theme";

const Nav: React.FC = (props) => {
  const [{ theme }, dispatch] = useStateValue();
  const changeTheme = () => {
    dispatch({
      type: ACTION_CHANGE_THEME,
      theme: theme === THEME_DARK ? THEME_LIGHT : THEME_DARK,
    });
  };
  return (
    <nav className={`${theme === THEME_LIGHT ? "nav-light" : "nav-dark"}`}>
      <span className="nav-left">
        <h3>Inu20TS</h3>
        <a href="#">Chat</a>
        <a href="#">More</a>
      </span>

      <button onClick={changeTheme}>
        {theme === THEME_LIGHT ? "Dark Mode" : "Light Mode"}
      </button>
    </nav>
  );
};

export default Nav;
