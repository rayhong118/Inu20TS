import React from "react";
import "./nav.scss";
import { useStateValue } from "../../tools/state";
import { ACTION_CHANGE_THEME, THEME_DARK, THEME_LIGHT } from "../../constants/theme";
import { NavLink } from "react-router-dom";

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
        <NavLink to={"./"}>
          <h3>Inu20TS</h3>
        </NavLink>

        <NavLink className="nav-link" to={"./auth"}>
          Auth
        </NavLink>
        <NavLink className="nav-link" to={"./chat"}>
          Chat
        </NavLink>
        <NavLink className="nav-link" to={"./more"}>
          More
        </NavLink>
      </span>

      <button onClick={changeTheme}>
        {theme === THEME_LIGHT ? "Dark Mode" : "Light Mode"}
      </button>
    </nav>
  );
};

export default Nav;
