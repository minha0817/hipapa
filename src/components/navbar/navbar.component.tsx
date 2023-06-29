"use client";
import { FC, PropsWithChildren } from "react";
import {
  createStyles,
  Header,
  Menu,
  Group,
  Center,
  Burger,
  Container,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import globalStyles from "../../variables.module.scss";
import { LuBaby } from "react-icons/lu";

// 파일은 하나 만들어서 거기서 import를 해와야함. 
import { Amatic_SC } from "next/font/google";
const amaticSc = Amatic_SC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-amaticSc",
  weight: "700",
});

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: `${globalStyles.secondaryColor}`,
  },

  title: {
    display: "flex",
    color: `${globalStyles.beige}`,
    alignItems: "center",
    fontFamily: amaticSc.variable,
    fontSize: theme.fontSizes.xl,
  },

  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: `${globalStyles.primaryColor}`
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

type NavbarProps = {
  links: {
    link: string;
    label: string;
    links: { link: string; label: string }[];
  }[];
};

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

const NavbarComponent: FC<PropsWithChildren<NavbarProps>> = () => {
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
    <Header height={56} className={classes.header} mb={120}>
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
NavbarComponent.displayName = "Navbar";

export const Navbar = NavbarComponent;
