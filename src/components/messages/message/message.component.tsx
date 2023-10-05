import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";

import styles from "./message.styles.module.scss";
import { MessageType } from "@/app/api/getMessages/types";
import { Badge, Paper, TextInput } from "@mantine/core";
import { Database } from "@/supabase.types";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BsCheckLg } from "react-icons/bs";
import axios, { AxiosResponse } from "axios";

type MessageProps = {
  message: MessageType;
};

const MessageComponent: FC<PropsWithChildren<MessageProps>> = ({ message }) => {
  const [user, setUser] = useState<User>();
  const [editMode, setEditMode] = useState<Boolean>(false);
  const editedMessageRef = useRef<HTMLInputElement | null>(null);

  const supabase = createClientComponentClient();
  
  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      const user = res.data.user;
      if (user) {
        setUser(user);
      }
    });
  }, [supabase]);

  const checkUserType = (
    userType: Database["public"]["Enums"]["user_type"]
  ) => {
    if (userType === "parent") {
      return "pink";
    } else {
      return "blue";
    }
  };

  const handleEditMode = (isEdit: boolean) => {
    setEditMode(isEdit);
  };

  const handleDelete = () => {
    axios
      .post<Response, AxiosResponse<Response>>("/api/deleteMessage", {
        messageId: message.messageId,
      })
      .then((res) => res.data)
      .catch((error) => {
        const {
          response: { data, status },
        } = error;
        console.error(`Failed: ${status}`, data);
      });
    handleEditMode(false);
  };

  const handleSave = () => {
    if (editedMessageRef.current) {
      const editedMessage = editedMessageRef.current.value;
      axios
        .post<Response, AxiosResponse<Response>>("/api/updateMessage", {
          messageId: message.messageId,
          body: editedMessage,
          messageRoomId: message.messageRoomId,
        })
        .then((res) => res.data)
        .catch((error) => {
          const {
            response: { data, status },
          } = error;
          console.error(`Failed: ${status}`, data);
        });
      editedMessageRef.current.value = "";
    }
    handleEditMode(false);
  };

  return (
    <Paper className={styles.message} p="m" withBorder>
      <div className="messageBox">
        <div className="title">
          <Badge
            variant="light"
            color={checkUserType(message.fromUserType)}
            size="lg"
          >
            {message.fromUserType}
          </Badge>
          <p className="time">{message.updatedAt}</p>
          {!editMode && user && message.fromUserId === user.id && (
            <GoPencil onClick={() => handleEditMode(true)} />
          )}
          {editMode && (
            <div className="editMode">
              <RiDeleteBin7Line onClick={handleDelete} className="icon" />
              <BsCheckLg onClick={handleSave} />
            </div>
          )}
        </div>
        <div>
          {editMode ? (
            <TextInput
              type="text"
              variant="unstyled"
              defaultValue={message.body}
              ref={editedMessageRef}
            />
          ) : (
            <p>{message.body}</p>
          )}
        </div>
      </div>
    </Paper>
  );
};
MessageComponent.displayName = "Message";

export const Message = MessageComponent;
