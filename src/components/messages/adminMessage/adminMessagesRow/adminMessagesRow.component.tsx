import { FC, PropsWithChildren, useEffect, useState } from "react";

import styles from "./adminMessagesRow.styles.module.scss";
import { MessageRoom } from "@/app/api/getMessagesRoom/types";
import { BiSolidMessageRoundedCheck } from "react-icons/bi";
import axios, { AxiosResponse } from "axios";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { RiDeleteBin7Line } from "react-icons/ri";

type AdminMessagesRowProps = {
  data: MessageRoom;
  openModal: (messageRoom: MessageRoom) => void;
};

const AdminMessagesRowComponent: FC<
  PropsWithChildren<AdminMessagesRowProps>
> = ({ data, openModal }) => {
  const [user, setUser] = useState<User>();
  const [newAlarm, setNewAlarm] = useState(false);
  const messageRoomId = data.messageRoomId;
  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      const user = res.data.user;
      if (user) {
        setUser(user);
      }
    });
  }, [supabase]);

  useEffect(() => {
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

    const checkMessages = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `messages_room_id=eq.${messageRoomId}`,
        },
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
  }, [supabase]);

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
      })
      .then(() => {
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
      });

    const checkMessages = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "check_messages",
          filter: `messages_room_id=eq.${messageRoomId}`,
        },
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
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `messages_room_id=eq.${messageRoomId}`,
        },
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
  };

  const handleDelete = () => {
    axios
      .post<Response, AxiosResponse<Response>>("/api/deleteMessageRoom", {
        messageRoomId: messageRoomId,
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
          <BiSolidMessageRoundedCheck
            style={{ color: "red", marginLeft: "5" }}
          />
        </td>
      ) : (
        <td>{data.title}</td>
      )}
      {/* {user?.id === data.createdBy && (
        <td>
          <RiDeleteBin7Line onClick={handleDelete} />
        </td>
      )} */}
    </tr>
  );
};
AdminMessagesRowComponent.displayName = "AdminMessagesRow";

export const AdminMessagesRow = AdminMessagesRowComponent;
