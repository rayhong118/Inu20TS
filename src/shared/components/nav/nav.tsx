import React from "react";
import "./nav.scss";
import firebase from "firebase/app";
import { useStateValue } from "../../tools/state";
import { ACTION_CHANGE_THEME, THEME_DARK, THEME_LIGHT } from "../../constants/theme";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faAdjust, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "react-firebase-hooks/auth";

const Nav: React.FC = (props) => {
  const [{ theme }, dispatch] = useStateValue();
  const [user, isAuthLoading, error] = useAuthState(firebase.auth());
  const changeTheme = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
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

        <NavLink className="nav-link" activeClassName="nav-link-active" to={"./chat"}>
          Chat
        </NavLink>
        <NavLink className="nav-link" activeClassName="nav-link-active" to={"./more"}>
          More
        </NavLink>
      </span>

      <span className="nav-right">
        <a href="" onClick={(e) => changeTheme(e)}>
          {theme === THEME_LIGHT ? "Dark Mode " : "Light Mode "}
          <FontAwesomeIcon icon={faAdjust} />
        </a>
        {isAuthLoading && (
          <div className="a-styled">
            <FontAwesomeIcon icon={faCircleNotch} spin />
          </div>
        )}
        {!isAuthLoading && !user && (
          <NavLink to={"./auth"}>
            Sign In <FontAwesomeIcon icon={faUserCircle} />
          </NavLink>
        )}
        {!isAuthLoading && user && (
          <NavLink to={"./auth"}>
            Setting <FontAwesomeIcon icon={faUserCircle} />
          </NavLink>
        )}
      </span>
    </nav>
  );
};

export default Nav;
