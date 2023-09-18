import { FC, PropsWithChildren } from "react";

import styles from "./adminMessagesTable.styles.module.scss";

type AdminMessagesTableProps = {
  // ...
};

const AdminMessagesTableComponent: FC<PropsWithChildren<AdminMessagesTableProps>> = () => {
  return <div className={styles.adminMessagesTable}>
    <h2>Admin Messages Table</h2>
    {/* Time, From, Subject column */}
  </div>;
};
AdminMessagesTableComponent.displayName = "AdminMessagesTable";

export const AdminMessagesTable = AdminMessagesTableComponent;