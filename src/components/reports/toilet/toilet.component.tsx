import { FC, PropsWithChildren } from "react";

import styles from "./toilet.styles.module.scss";

type ToiletProps = {
  // ...
};

const ToiletComponent: FC<PropsWithChildren<ToiletProps>> = () => {
  return (
    <div className={styles.toilet}>
      <h2>Toilet reports</h2>
    </div>
  );
};
ToiletComponent.displayName = "Toilet";

export const Toilet = ToiletComponent;
