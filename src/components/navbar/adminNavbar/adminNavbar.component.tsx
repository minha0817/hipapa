"use client";
import { Header, Group, Burger, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LuBaby } from "react-icons/lu";
import { useStyles } from "../navbar.styles";
import { useEffect, useState } from "react";
import Link from "next/link";

const teacherLinks = [
  {
    link: "/admin/reports",
    label: "Reports",
  },
  { link: "", label: "Timer" },
  { link: "", label: "Messages" },
];

const adminLinks = [
  {
    link: "/admin/reports",
    label: "Reports",
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

  const items = links.map((item) => (
    <Link href={item.link} className={classes.link}>
    {item.label}
  </Link>
  ))

  return (
    <Header height={56} className={classes.header}>
      <Container>
        <div className={classes.inner}>
          <div className={classes.title}>
            <LuBaby size={30} style={{ marginRight: 5 }} />
            <Link href="/admin/home">
              <p className={classes.a}>HIPAPA</p>
            </Link>
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
