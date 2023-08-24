import { FC, PropsWithChildren } from "react";

import styles from "./meal.styles.module.scss";

type MealProps = {
  // ...
};

const MealComponent: FC<PropsWithChildren<MealProps>> = () => {
  return (
    <div className={styles.meal}>
      <h2>Meal reports</h2>
    </div>
  );
};
MealComponent.displayName = "Meal";

export const Meal = MealComponent;
