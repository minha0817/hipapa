"use client";
import styles from "./adminMessages.module.scss";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { getChildren } from "@/app/api/get";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Child } from "@/app/api/getChild/types";
import axios from "axios";
import { AddAdminMessagesRoomModal } from "@/components/messages/adminMessage/addAdminMessagesRoomModal/addAdminMessagesRoomModal.component";
import { AdminMessagesTable } from "@/components/messages/adminMessage/adminMessagesTable/adminMessagesTable.component";
import { MessageRoom } from "@/app/api/getMessagesRoom/types";

const adminMessagesPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [children, setChildren] = useState<Child[]>([]);
  const [messageRooms, setMessageRooms] = useState<MessageRoom[]>([]);
  const daycareId = children[0]?.daycareId;
  const supabase = createClientComponentClient();

  useEffect(() => {
    getChildren(supabase).then(setChildren);

    const messageRooms = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages_room" },
        () => {
          axios
            .post("/api/getMessagesRoom", {
              daycareId,
            })
            .then((res) => setMessageRooms(res.data))
            .catch((error) => {
              const {
                response: { data, status },
              } = error;
              console.error(`Failed: ${status}`, data);
            });
        }
      )
      .subscribe();

    if (daycareId) {
      axios
        .post("/api/getMessagesRoom", {
          daycareId,
        })
        .then((res) => setMessageRooms(res.data))
        .catch((error) => {
          const {
            response: { data, status },
          } = error;
          console.error(`Failed: ${status}`, data);
        });
    }

    return () => {
      messageRooms.unsubscribe();
    };
  }, [daycareId, supabase]);

  return (
    <div className={styles.adminMessages}>
      <Modal opened={opened} onClose={close} title="Compose Messages">
        <AddAdminMessagesRoomModal childrenList={children} close={close}/>
      </Modal>
      <h1>Messages</h1>
      <Button variant="light" color="green" onClick={open}>
        Compose Messages
      </Button>
      <AdminMessagesTable messageRooms={messageRooms} />
    </div>
  );
};

export default adminMessagesPage;
