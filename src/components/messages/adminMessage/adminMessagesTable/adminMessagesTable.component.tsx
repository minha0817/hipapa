import { FC, PropsWithChildren, useState } from "react";

import styles from "./adminMessagesTable.styles.module.scss";
import { Modal, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AdminMessagesRow } from "../adminMessagesRow/adminMessagesRow.component";
import { AddMessageModal } from "@/components/messages/addMessageModal/addMessageModal.component";
import { MessageRoom } from "@/app/api/getMessagesRoom/types";

type AdminMessagesTableProps = {
  messageRooms: MessageRoom[];
};

const AdminMessagesTableComponent: FC<
  PropsWithChildren<AdminMessagesTableProps>
> = ({ messageRooms }) => {
  if (!messageRooms) return;

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedRoom, setSelectedRoom] = useState<MessageRoom>();

  const openModal = (selectedRoom: MessageRoom) => {
    if (selectedRoom) {
      setSelectedRoom(selectedRoom);
      open();
    }
  };

  return (
    <div className={styles.adminMessagesTable}>
      <Modal opened={opened} onClose={close} title={selectedRoom?.title}>
        {selectedRoom && <AddMessageModal selectedRoom={selectedRoom} />}
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
          {messageRooms.map((room) => {
            return (
              <AdminMessagesRow
                data={room}
                openModal={openModal}
                key={room.messageRoomId}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

AdminMessagesTableComponent.displayName = "AdminMessagesTable";

export const AdminMessagesTable = AdminMessagesTableComponent;
