import React, { useState } from "react";
import "./Navigation.scss";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  makeStyles,
  shorthands,
  tokens,
} from "@fluentui/react-components";
import {
  TextColumnOneWide20Regular,
  Dismiss24Regular,
} from "@fluentui/react-icons";

export const NavigationComponent = () => {
  const navigate = useNavigate();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  interface NavigationItems {
    key: string;
    text: string;
    path: string;
  }

  const NavigationItemsList: NavigationItems[] = [
    { key: "main", text: "Home page", path: "/" },
    {
      key: "authentication",
      text: "Authentication",
      path: "/authentication",
    },
  ];

  return (
    <>
      Doghead Portal
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
        <DrawerBody>
          {NavigationItemsList.map((navigationItem) => (
            <Button
              appearance="secondary"
              onClick={() => {
                navigate(navigationItem.path);
                setIsNavigationOpen(false);
              }}
            >
              {navigationItem.text}
            </Button>
          ))}
        </DrawerBody>
      </Drawer>
      <Button appearance="secondary" onClick={() => setIsNavigationOpen(true)}>
        <TextColumnOneWide20Regular />
        Menu
      </Button>
    </>
  );
};
