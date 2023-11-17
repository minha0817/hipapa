"use client";
import styles from "./parentMessages.module.scss";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Child } from "@/app/api/getChild/types";
import axios from "axios";
import { AdminMessagesTable } from "@/components/messages/adminMessage/adminMessagesTable/adminMessagesTable.component";
import { AddParentMessagesRoomModal } from "@/components/messages/parentMessage/addParentMessageRoomModal/addParentMessageRoomModal.component";
import { MessageRoom } from "@/app/api/getMessagesRoom/types";

const ParentMessagePage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const supabase = createClientComponentClient();
  const [child, setChild] = useState<Child[]>([]);
  const [messageRooms, setMessageRooms] = useState<MessageRoom[]>([]);
  const childId = child[0]?.childId;

  useEffect(() => {
    const messageRooms = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages_room" },
        () => {
          axios
            .post("/api/getMessageRoomsByChild", {
              childId,
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

    axios
      .post("/api/getChild")
      .then((res) => setChild([res.data]))
      .catch((error) => {
        const {
          response: { data, status },
        } = error;
        console.error(`Failed: ${status}`, data);
      });

    if (childId) {
      axios
        .post("/api/getMessageRoomsByChild", { childId })
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
  }, [supabase, childId]);

  return (
    <div className={styles.parentMessages}>
      <Modal opened={opened} onClose={close} title="Compose Messages">
        <AddParentMessagesRoomModal childrenList={child} close={close} />
      </Modal>
      <h1>Messages</h1>
      <Button variant="light" color="green" onClick={open}>
        Compose Messages
      </Button>
      <AdminMessagesTable messageRooms={messageRooms} />
    </div>
  );
};

export default ParentMessagePage;
