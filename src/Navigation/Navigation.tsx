import React, { useState } from "react";
import "./Navigation.scss";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  CompoundButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Tab,
  TabList,
  makeStyles,
} from "@fluentui/react-components";
import {
  Navigation20Regular,
  Dismiss20Regular,
  FluentIcon,
  LockClosed16Regular,
  BookOpen16Regular,
  Food16Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  navLink: {
    display: "flex",
    justifyContent: "stretch",
    fontWeight: "bold",
  },
});

export const NavigationComponent = () => {
  const styles = useStyles();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const navigate = useNavigate();
  interface NavigationItems {
    key: string;
    text: string;
    path: string;
  }

  const NavigationItemsList: NavigationItems[] = [
    { key: "main", text: "Home", path: "/" },
    {
      key: "authentication",
      text: "Log in/Sign up",
      path: "/authentication",
    },
    {
      key: "dineData",
      text: "Dine data",
      path: "/dinedata",
    },
  ];

  return (
    <div className={styles.root}>
      <Button
        appearance="transparent"
        size="large"
        onClick={() => navigate("/")}
      >
        Doghead Portal
      </Button>
      <Drawer
        open={isNavigationOpen}
        separator
        onOpenChange={(_, { open }) => setIsNavigationOpen(open)}
        position="end"
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                icon={<Dismiss20Regular />}
                onClick={() => setIsNavigationOpen(false)}
              />
            }
          />
        </DrawerHeader>
        <DrawerBody className={styles.content}>
          {NavigationItemsList.map((navigationItem) => (
            <NavLink
              to={navigationItem.path}
              onClick={() => {
                setIsNavigationOpen(false);
              }}
            >
              {navigationItem.text}
            </NavLink>
          ))}
        </DrawerBody>
      </Drawer>
      <Button
        appearance="secondary"
        size="large"
        icon={<Navigation20Regular />}
        onClick={() => setIsNavigationOpen(true)}
      >
        Menu
      </Button>
    </div>
  );
};
