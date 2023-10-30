"use client";
import styles from "./parentMessages.module.scss";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { getChildren } from "@/app/api/get";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Child } from "@/app/api/getChild/types";
import { MessageRoom } from "@/app/api/getMessagesRoom/types";
import axios from "axios";
import { AddAdminMessagesRoomModal } from "@/components/messages/adminMessage/addAdminMessagesRoomModal/addAdminMessagesRoomModal.component";
import { AdminMessagesTable } from "@/components/messages/adminMessage/adminMessagesTable/adminMessagesTable.component";

//get messageRoom only for certain child.

const parentMessagePage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const supabase = createClientComponentClient();
  const [child, setChild] = useState<Child[]>([]);

  useEffect(() => {
    axios
      .post("/api/getChild", {
      })
      .then((res) => setChild([res.data]))
      .catch((error) => {
        const {
          response: { data, status },
        } = error;
        console.error(`Failed: ${status}`, data);
      });
  }, [supabase]);

  return (
    <div className={styles.parentMessages}>
      <Modal opened={opened} onClose={close} title="Compose Messages">
        {/* <AddAdminMessagesRoomModal childrenList={child} close={close}/> */}
      </Modal>
      <h1>Messages</h1>
      <Button variant="light" color="green" onClick={open}>
        Compose Messages
      </Button>
      {/* <AdminMessagesTable messageRooms={messageRooms} /> */}
    </div>
  );

  // const [children, setChildren] = useState<Child[]>([]);
  // const [messageRooms, setMessageRooms] = useState<MessageRoom[]>([]);

  // useEffect(() => {
  //   getChildren(supabase).then(setChildren);

  //   const messageRooms = supabase
  //     .channel("custom-all-channel")
  //     .on(
  //       "postgres_changes",
  //       { event: "*", schema: "public", table: "messages_room" },
  //       () => {
  //         axios
  //           .post("/api/getMessagesRoom", {
  //             daycareId,
  //           })
  //           .then((res) => setMessageRooms(res.data))
  //           .catch((error) => {
  //             const {
  //               response: { data, status },
  //             } = error;
  //             console.error(`Failed: ${status}`, data);
  //           });
  //       }
  //     )
  //     .subscribe();

  //   if (daycareId) {
  //     axios
  //       .post("/api/getMessagesRoom", {
  //         daycareId,
  //       })
  //       .then((res) => setMessageRooms(res.data))
  //       .catch((error) => {
  //         const {
  //           response: { data, status },
  //         } = error;
  //         console.error(`Failed: ${status}`, data);
  //       });
  //   }

  //   return () => {
  //     messageRooms.unsubscribe();
  //   };
  // }, [daycareId, supabase]);

};

export default parentMessagePage;
