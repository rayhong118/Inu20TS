import React, { useEffect, useState } from "react";
import "./nav.scss";
import firebase from "firebase/app";
import { useStateValue } from "../../tools/state";
import { ACTION_CHANGE_THEME, THEME_DARK, THEME_LIGHT } from "../../constants/theme";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faAdjust,
  faCircleNotch,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "react-firebase-hooks/auth";

const Nav: React.FC = (props) => {
  const [{ theme }, dispatch] = useStateValue();
  const [menuDisplayed, setMenuDisplayed] = useState(false);
  const [user, isAuthLoading, error] = useAuthState(firebase.auth());
  const changeTheme = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    document.documentElement.className = "";
    document.documentElement.classList.add(
      theme === THEME_DARK ? THEME_LIGHT : THEME_DARK
    );
    event.preventDefault();
    dispatch({
      type: ACTION_CHANGE_THEME,
      theme: theme === THEME_DARK ? THEME_LIGHT : THEME_DARK,
    });
  };

  useEffect(() => {
    document.documentElement.className = theme;
    window.onclick = (e: MouseEvent) => {
      console.log((e.target as HTMLElement).classList);
      if ((e.target as HTMLElement).classList.contains("mobile-menu-button")) {
        setMenuDisplayed(false);
      }
    };
  }, []);

  return (
    <nav className={`${theme === THEME_LIGHT ? "nav-light" : "nav-dark"}`}>
      <span className="nav-left">
        <NavLink id="logo" to={"./"}>
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

      <div id="mobileMenu">
        <button
          id="mobileMenuTrigger"
          onClick={() => {
            setMenuDisplayed(!menuDisplayed);
          }}
        >
          {menuDisplayed ? (
            <FontAwesomeIcon icon={faTimes} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </button>
        {menuDisplayed && (
          <div id="mobileMenuBody">
            <a className="mobile-menu-button" href="" onClick={(e) => changeTheme(e)}>
              <FontAwesomeIcon icon={faAdjust} />
              {theme === THEME_LIGHT ? " Dark Mode " : " Light Mode "}
            </a>
            {isAuthLoading && (
              <div className="mobile-menu-button">
                <FontAwesomeIcon icon={faCircleNotch} spin />
              </div>
            )}
            {!isAuthLoading && !user && (
              <Link className="mobile-menu-button" to={"./auth"}>
                <FontAwesomeIcon icon={faUserCircle} /> Sign In
              </Link>
            )}
            {!isAuthLoading && user && (
              <Link className="mobile-menu-button" to={"./auth"}>
                <FontAwesomeIcon icon={faUserCircle} /> Setting
              </Link>
            )}
            <Link className="mobile-menu-button" to={"./chat"}>
              Chat
            </Link>
            <Link className="mobile-menu-button" to={"./more"}>
              More
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
