import { createStyles, rem } from "@mantine/core";
import globalStyles from "../../variables.module.scss";
import { Amatic_SC } from "next/font/google";

const amaticSc = Amatic_SC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-amaticSc",
  weight: "700",
});

export const useStyles = createStyles((theme) => ({
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
      backgroundColor: `${globalStyles.primaryColor}`,
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));
