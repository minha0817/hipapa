import { FC, PropsWithChildren, useEffect, useState } from "react";

import styles from "./adminMessagesTable.styles.module.scss";
import { Table } from "@mantine/core";
import axios from "axios";
import { MessagesRoom } from "@/app/api/getMessagesRoom/types";

type AdminMessagesTableProps = {
  daycareId: string;
};

const AdminMessagesTableComponent: FC<
  PropsWithChildren<AdminMessagesTableProps>
> = ({ daycareId }) => {
  const [messagesRoom, setMessagesRoom] = useState<MessagesRoom[]>([]);

  useEffect(() => {
    if (daycareId) {
      axios
        .post("/api/getMessagesRoom", {
          daycareId,
        })
        .then((res) => setMessagesRoom(res.data))
        .catch((error) => {
          const {
            response: { data, status },
          } = error;
          console.error(`Failed: ${status}`, data);
        });
    }
  }, [daycareId]);

  console.log("messagesRoom", messagesRoom);

  return (
    <div className={styles.adminMessagesTable}>
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
    </div>
  );
};
AdminMessagesTableComponent.displayName = "AdminMessagesTable";

export const AdminMessagesTable = AdminMessagesTableComponent;
