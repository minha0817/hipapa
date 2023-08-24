import { FC, PropsWithChildren } from "react";

import styles from "./activity.styles.module.scss";

type ActivityProps = {
  // ...
};

const ActivityComponent: FC<PropsWithChildren<ActivityProps>> = () => {
  return (
    <div className={styles.activity}>
      <h2>Activity reports </h2>
    </div>
  );
};
ActivityComponent.displayName = "Activity";

export const Activity = ActivityComponent;
