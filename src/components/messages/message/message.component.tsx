import { FC, PropsWithChildren } from "react";

import styles from "./message.styles.module.scss";
import { MessageType } from "@/app/api/getMessages/types";
import { Badge, Paper } from "@mantine/core";
import { Database } from "@/supabase.types";

type MessageProps = {
  message: MessageType;
};

const MessageComponent: FC<PropsWithChildren<MessageProps>> = ({ message }) => {
  const checkUserType = (
    userType: Database["public"]["Enums"]["user_type"]
  ) => {
    if (userType === "parent") {
      return "pink";
    } else {
      return "blue";
    }
  };

  return (
    <Paper className={styles.message} shadow="lg" p="m">
      <div className="messageBox">
        <div className="title">
          <Badge
            variant="light"
            color={checkUserType(message.fromUserType)}
            size="lg"
          >
            {message.fromUserType}
          </Badge>
          <p className="time">{message.createdAt}</p>
        </div>
        <div>
          <p>{message.body}</p>
        </div>
      </div>
    </Paper>
  );
};
MessageComponent.displayName = "Message";

export const Message = MessageComponent;
