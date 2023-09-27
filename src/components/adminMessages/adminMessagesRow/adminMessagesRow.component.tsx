import { FC, PropsWithChildren } from "react";

import styles from "./adminMessagesRow.styles.module.scss";
import { MessagesRoom } from "@/app/api/getMessagesRoom/types";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

type AdminMessagesRowProps = {
  data: any;
  openModal: any;
};

const AdminMessagesRowComponent: FC<
  PropsWithChildren<AdminMessagesRowProps>
> = ({ data, openModal }) => {
  return (
    <tr
      key={data.messagesRoomId}
      onClick={openModal}
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
