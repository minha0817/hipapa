import { FC, PropsWithChildren } from "react";

import styles from "./adminMessagesTable.styles.module.scss";
import { Table } from "@mantine/core";

type AdminMessagesTableProps = {
  // ...
};



const AdminMessagesTableComponent: FC<PropsWithChildren<AdminMessagesTableProps>> = () => {
  return <div className={styles.adminMessagesTable}>
    {/* Time, From, Subject column */}
    <Table className="table">
      <thead>
        <tr>
          <th>Time</th>
          <th>From</th>
          <th>Subject</th>
        </tr>
      </thead>
      {/* <tbody>{rows}</tbody> */}
    </Table>
  </div>;
};
AdminMessagesTableComponent.displayName = "AdminMessagesTable";

export const AdminMessagesTable = AdminMessagesTableComponent;