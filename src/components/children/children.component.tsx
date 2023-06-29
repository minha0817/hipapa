import { FC, PropsWithChildren } from "react";

import styles from "./children.styles.module.scss";

type ChildrenProps = {
  // ...
};

const ChildrenComponent: FC<PropsWithChildren<ChildrenProps>> = () => {
  return <div className={styles.children}></div>;
};
ChildrenComponent.displayName = "Children";

export const Children = ChildrenComponent;