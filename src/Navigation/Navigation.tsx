import React, { useState } from "react";
import "./Navigation.scss";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  MenuItem,
  MenuList,
  makeStyles,
} from "@fluentui/react-components";
import {
  Navigation20Regular,
  Dismiss20Regular,
  Home20Regular,
  LockOpen20Regular,
  Food20Regular,
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
    icon: React.JSX.Element;
  }

  const NavigationItemsList: NavigationItems[] = [
    {
      key: "main",
      text: "Home",
      path: "/",
      icon: <Home20Regular />,
    },
    {
      key: "authentication",
      text: "Log in/Sign up",
      path: "/authentication",
      icon: <LockOpen20Regular />,
    },
    {
      key: "dineData",
      text: "Dine data",
      path: "/dinedata",
      icon: <Food20Regular />,
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
          <MenuList hasIcons>
            {NavigationItemsList.map((navigationItem) => (
              <MenuItem
                icon={navigationItem.icon}
                onClick={() => {
                  setIsNavigationOpen(false);
                  navigate(navigationItem.path);
                }}
              >
                {navigationItem.text}
              </MenuItem>
            ))}
          </MenuList>
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
