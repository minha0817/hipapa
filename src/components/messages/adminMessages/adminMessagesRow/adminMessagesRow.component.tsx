import { FC, PropsWithChildren, useEffect, useState } from "react";

import styles from "./adminMessagesRow.styles.module.scss";
import { MessageRoom } from "@/app/api/getMessagesRoom/types";
import { BiSolidMessageRoundedCheck } from "react-icons/bi";
import axios from "axios";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type AdminMessagesRowProps = {
  data: MessageRoom;
  openModal: (messageRoom: MessageRoom) => void;
};

const AdminMessagesRowComponent: FC<
  PropsWithChildren<AdminMessagesRowProps>
> = ({ data, openModal }) => {
  const [newAlarm, setNewAlarm] = useState(true);
  const messageRoomId = data.messageRoomId;
  const supabase = createClientComponentClient();

  useEffect(() => {
    axios
      .post("/api/getCheckMessage", {
        messageRoomId,
      })
      .then((res) => {
        console.log("result of get check message ----- ", res.data);
        setNewAlarm(res.data);
      })
      .catch((error) => {
        const {
          response: { data, status },
        } = error;
        console.error(`Failed: ${status}`, data);
      });

    const checkMessages = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "check_messages" },
        () => {
          axios
            .post("/api/getCheckMessage", {
              messageRoomId,
            })
            .then((res) => {
              setNewAlarm(res.data);
            })
            .catch((error) => {
              const {
                response: { data, status },
              } = error;
              console.error(`Failed: ${status}`, data);
            });
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => {
          axios
            .post("/api/getCheckMessage", {
              messageRoomId,
            })
            .then((res) => {
              setNewAlarm(res.data);
            })
            .catch((error) => {
              const {
                response: { data, status },
              } = error;
              console.error(`Failed: ${status}`, data);
            });
        }
      )
      .subscribe();

    return () => {
      checkMessages.unsubscribe();
    };
  }, [supabase, messageRoomId]);

  const handleRowClick = () => {
    openModal(data);

    axios
      .post("/api/updateCheckMessage", {
        messageRoomId,
      })
      .then((res) => res.data)
      .catch((error) => {
        const {
          response: { data, status },
        } = error;
        console.error(`Failed: ${status}`, data);
      });
  };

  return (
    <tr
      key={messageRoomId}
      onClick={handleRowClick}
      className={styles.adminMessagesRow}
    >
      <td>{data.createdAt}</td>
      <td>{data.childName}</td>
      {newAlarm ? (
        <td>
          {data.title}
          <BiSolidMessageRoundedCheck style={{ color: "red" }} />
        </td>
      ) : (
        <td>{data.title}</td>
      )}
    </tr>
  );
};
AdminMessagesRowComponent.displayName = "AdminMessagesRow";

export const AdminMessagesRow = AdminMessagesRowComponent;
