import React, { useState } from "react";
import "./Navigation.scss";
import { NavLink } from "react-router-dom";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Text,
  makeStyles,
} from "@fluentui/react-components";
import { Navigation20Regular, Dismiss24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
  },
  navLink: { fontWeight: "bold" },
  active: { color: "red" },
});

export const NavigationComponent = () => {
  const styles = useStyles();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
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
      <Text>Doghead Portal</Text>
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
                icon={<Dismiss24Regular />}
                onClick={() => setIsNavigationOpen(false)}
              />
            }
          />
        </DrawerHeader>
        <DrawerBody className={styles.content}>
          {NavigationItemsList.map((navigationItem) => (
            <NavLink to={navigationItem.path} className={styles.navLink}>
              {navigationItem.text}
            </NavLink>
          ))}
        </DrawerBody>
      </Drawer>
      <Button
        appearance="secondary"
        icon={<Navigation20Regular />}
        onClick={() => setIsNavigationOpen(true)}
      >
        Menu
      </Button>
    </div>
  );
};
