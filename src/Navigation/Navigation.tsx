import React, { useState } from "react";
import "./Navigation.scss";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
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
  Home16Regular,
  LockClosed16Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  navLink: { fontWeight: "bold" },
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
      text: "Authentication",
      path: "/authentication",
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
          <TabList vertical size="large" appearance="subtle">
            {NavigationItemsList.map((navigationItem) => (
              <Tab
                value={navigationItem.text}
                onClick={() => {
                  navigate(navigationItem.path);
                  setIsNavigationOpen(false);
                }}
              >
                {navigationItem.text}
              </Tab>
            ))}
          </TabList>
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
