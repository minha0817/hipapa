import { FC, PropsWithChildren } from "react";

import styles from "./adminMessagesTable.styles.module.scss";
import { Modal, Table } from "@mantine/core";
import { MessagesRoom } from "@/app/api/getMessagesRoom/types";
import { useDisclosure } from "@mantine/hooks";
import { AdminMessagesRow } from "../adminMessagesRow/adminMessagesRow.component";
import { AddMessageModal } from "@/components/addMessageModal/addMessageModal.component";

type AdminMessagesTableProps = {
  daycareId: string;
  messagesRoom: MessagesRoom[];
};

const AdminMessagesTableComponent: FC<
  PropsWithChildren<AdminMessagesTableProps>
> = ({ daycareId, messagesRoom }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const openModal = () => {
    open();
  };
  
  return (
    <div className={styles.adminMessagesTable}>
      <Modal
        opened={opened}
        onClose={close}
        title="Messages"
      >
        <AddMessageModal />
      </Modal>
      <Table className="table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Child</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {/* Question : type  */}
          {messagesRoom.map((x: any) => (
            <AdminMessagesRow data={x} openModal={openModal} key={x.messagesRoomId}/>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
AdminMessagesTableComponent.displayName = "AdminMessagesTable";

export const AdminMessagesTable = AdminMessagesTableComponent;
