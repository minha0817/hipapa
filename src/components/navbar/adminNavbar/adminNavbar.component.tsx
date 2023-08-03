"use client";
import { Header, Menu, Group, Center, Burger, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LuBaby } from "react-icons/lu";
import {AiFillCaretDown} from "react-icons/ai"
import { useStyles } from "../navbar.styles";
import { useEffect, useState } from "react";

const teacherLinks = [
  {
    link: "",
    label: "Reports",
    links: [
      { link: "/admin/reports/incident", label: "Incident" },
      { link: "/admin/reports/meal", label: "Meal" },
      { link: "/admin/reports/sleep", label: "Sleep" },
      { link: "/admin/reports/activity", label: "Activity" },
    ],
  },
  { link: "", label: "Timer" },
  { link: "", label: "Messages" },
];

const adminLinks = [
  {
    link: "",
    label: "Reports",
    links: [
      { link: "/admin/reports/incident", label: "Incident" },
      { link: "/admin/reports/meal", label: "Meal" },
      { link: "/admin/reports/sleep", label: "Sleep" },
      { link: "/admin/reports/activity", label: "Activity" },
    ],
  },
  { link: "", label: "Timer" },
  { link: "", label: "Messages" },
  { link: "", label: "Settings" },
];

const AdminNavbarComponent = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [userType, setUserType] = useState("");
  const { classes } = useStyles();

  useEffect(() => {
    const storedValue = localStorage.getItem("value") || "";
    setUserType(storedValue);
  }, []);

  const links = userType === "admin" ? adminLinks : teacherLinks;

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.label}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <AiFillCaretDown size="0.9rem" />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Header height={56} className={classes.header}>
      <Container>
        <div className={classes.inner}>
          <div className={classes.title}>
            <LuBaby size={30} style={{ marginRight: 5 }} />
            <p>HIPAPA</p>
          </div>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
            color="#fff"
          />
        </div>
      </Container>
    </Header>
  );
};
AdminNavbarComponent.displayName = "AdminNavbar";

export const AdminNavbar = AdminNavbarComponent;
