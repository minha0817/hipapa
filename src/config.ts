export const ADMIN_PATH_PREFIX = "/admin";

export const PARENT_PATH_PREFIX = "/parent";


export const PATH = {
  HOME: "/",
};

export const TITLE_SUFFIX = "HI PAPA";
export const makeTitle = (pageDesc: string): string => `${pageDesc} · ${TITLE_SUFFIX}`;
