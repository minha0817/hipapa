"use client";
import {
  Header,
  Menu,
  Group,
  Center,
  Burger,
  Container,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { LuBaby } from "react-icons/lu";
import { useStyles } from "../navbar.styles";

const adminLinks = [
  {
    link: "",
    label: "Reports",
    links: [
      { link: "", label: "Incidents" },
      { link: "", label: "Meals" },
      { link: "", label: "Sleep" },
      { link: "", label: "Activities" },
    ],
  },
  { link: "", label: "Timer" },
  { link: "", label: "Messages" },
];

const AdminNavbarComponent = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  const items = adminLinks.map((link) => {
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
                <IconChevronDown size="0.9rem" stroke={1.5} />
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