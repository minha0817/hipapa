"use client";
import { Header, Group, Burger, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LuBaby } from "react-icons/lu";
import styles from "./parentNavbar.styles.module.scss";
import { useStyles } from "../navbar.styles";
import Link from "next/link";

const parentLinks = [
  {
    link: "",
    label: "Reports",
  },
  { link: "/parent/messages", label: "Messages" },
];

const ParentNavbarComponent = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  const items = parentLinks.map((item) => {
    return (
      <Link key={item.label} href={item.link} className={classes.link}>
        {item.label}
      </Link>
    );
  });

  return (
    <Header height={56} className={classes.header}>
      <Container>
        <div className={classes.inner}>
          <div className={classes.title}>
            <LuBaby size={30} style={{ marginRight: 5 }} />

            <Link href="/parent/home">
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
ParentNavbarComponent.displayName = "ParentNavbar";

export const ParentNavbar = ParentNavbarComponent;
