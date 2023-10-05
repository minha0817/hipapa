import { FC, PropsWithChildren } from "react";

import styles from "./adminMessagesRow.styles.module.scss";
import { MessageRoom } from "@/app/api/getMessagesRoom/types";

type AdminMessagesRowProps = {
  data: MessageRoom;
  openModal: (messageRoom: MessageRoom) => void;
};

const AdminMessagesRowComponent: FC<
  PropsWithChildren<AdminMessagesRowProps>
> = ({ data, openModal }) => {
  return (
    <tr
      key={data.messageRoomId}
      onClick={() => {
        openModal(data);
      }}
      className={styles.adminMessagesRow}
    >
      <td>{data.createdAt}</td>
      <td>{data.childName}</td>
      <td>{data.title}</td>
    </tr>
  );
};
AdminMessagesRowComponent.displayName = "AdminMessagesRow";

export const AdminMessagesRow = AdminMessagesRowComponent;
