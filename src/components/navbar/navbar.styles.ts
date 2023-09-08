import { createStyles, rem } from "@mantine/core";
import globalStyles from "../../variables.module.scss";
import { amaticScFontClass } from "@/lib/font";

export const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: `${globalStyles.secondaryColor}`,
  },

  title: {
    display: "flex",
    color: `${globalStyles.beige}`,
    alignItems: "center",
    fontFamily: amaticScFontClass,
    fontSize: theme.fontSizes.xl,
  },

  container: {
    maxWidth: "120rem"
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

  innerLink: {
    textDecoration: "none",
    color: theme.black,
  },

  linkLabel: {
    marginRight: rem(5),
  },

  a: {
    color: `${globalStyles.beige}`
  }
}));
