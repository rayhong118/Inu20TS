import React, { useContext } from "react";
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
      <button onClick={changeTheme}>switch</button>
    </nav>
  );
};

export default Nav;
