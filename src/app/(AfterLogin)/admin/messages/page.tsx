"use client";
import styles from "./adminMessages.module.scss";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group } from "@mantine/core";
import { AddAdminMessagesRoomModal } from "@/components/adminMessages/addAdminMessagesRoomModal/addAdminMessagesRoomModal.component";
import { AdminMessagesTable } from "@/components/adminMessages/adminMessagesTable/adminMessagesTable.component";
import { getChildren } from "@/app/api/get";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Child } from "@/dbModels/types";
import { MessagesRoom } from "@/app/api/getMessagesRoom/types";
import axios from "axios";

const adminMessagesPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [children, setChildren] = useState<Child[]>([]);
  const [messagesRoom, setMessagesRoom] = useState<MessagesRoom[]>([]);
  const daycareId = children[0]?.daycare_id;
  const supabase = createClientComponentClient();

  useEffect(() => {
    getChildren(supabase).then(setChildren);

    const messagesRoom = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages_room" },
        () => {
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
      )
      .subscribe();

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

    return () => {
      messagesRoom.unsubscribe();
    };
  }, [daycareId, supabase]);

  return (
    <div className={styles.adminMessages}>
      <Modal opened={opened} onClose={close} title="Compose Messages">
        <AddAdminMessagesRoomModal childrenList={children} close={close} />
      </Modal>
      <h1>Messages</h1>
      <Button variant="light" color="green" onClick={open}>
        Compose Messages
      </Button>
      <AdminMessagesTable daycareId={daycareId} messagesRoom={messagesRoom} />
    </div>
  );
};

export default adminMessagesPage;
