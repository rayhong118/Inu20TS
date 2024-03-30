import React from "react";
import "./Navigation.scss";
import { NavLink } from "react-router-dom";

export const NavigationComponent = () => {
  interface NavigationItems {
    key: string;
    text: string;
    path: string;
  }

  const NavigationItemsList: NavigationItems[] = [
    { key: "main", text: "home page", path: "/" },
    {
      key: "authentication",
      text: "authentication",
      path: "/authentication",
    },
  ];

  return (
    <>
      Doghead portal
      {NavigationItemsList.map((navigationItem) => (
        <NavLink to={navigationItem.path}>{navigationItem.text}</NavLink>
      ))}
    </>
  );
};
