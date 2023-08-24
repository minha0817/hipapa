import { FC, PropsWithChildren } from "react";

import styles from "./incident.styles.module.scss";

type IncidentProps = {
  // ...
};

const IncidentComponent: FC<PropsWithChildren<IncidentProps>> = () => {
  return (
    <div className={styles.incident}>
      <h2>Incident reports</h2>
    </div>
  );
};
IncidentComponent.displayName = "Incident";

export const Incident = IncidentComponent;
