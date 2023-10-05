import { FC, PropsWithChildren, useEffect, useState } from "react";

import styles from "./addMessageModal.styles.module.scss";
import { Textarea, FileInput, Button, Paper } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import {
  AddMessageModalForm,
  addMessageModalSchema,
} from "./addMessageModal.types";
import axios, { AxiosResponse } from "axios";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { RxAvatar } from "react-icons/rx";
import { MessageType } from "@/app/api/getMessages/types";
import { MessageRoom } from "@/app/api/getMessagesRoom/types";
import { Message } from "../message/message.component";

type AddMessageModalProps = {
  selectedRoom: MessageRoom;
};

const AddMessageModalComponent: FC<PropsWithChildren<AddMessageModalProps>> = ({
  selectedRoom,
}) => {
  const supabase = createClientComponentClient();
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    const selectedRoomId = selectedRoom.messageRoomId;
    if (selectedRoom) {
      axios
        .post("/api/getMessages", { selectedRoomId })
        .then((res) => setMessages(res.data))
        .catch((error) => {
          const {
            response: { data, status },
          } = error;
          console.error(`Failed: ${status}`, data);
        });
    }

    const messages = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => {
          axios
            .post("/api/getMessages", { selectedRoomId })
            .then((res) => setMessages(res.data))
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
      messages.unsubscribe();
    };
  }, [selectedRoom, supabase]);

  const form = useForm<Partial<AddMessageModalForm>>({
    validate: zodResolver(addMessageModalSchema),
    initialValues: {
      message: "",
    },
  });

  const handleAddMessage = (values: AddMessageModalForm) => {
    axios
      .post<Response, AxiosResponse<Response>>("/api/createMessage", {
        values,
        messageRoomId: selectedRoom.messageRoomId,
      })
      .then((res) => res.data)
      .catch((error) => {
        const {
          response: { data, status },
        } = error;
        console.error(`Failed: ${status}`, data);
      })
      .then(() => form.reset())
  };

  return (
    <div className={styles.addMessageModal}>
      <div className="titleWithMessages">
        <Paper className="childInfo"  withBorder p="xl">
          <RxAvatar />
          <span className="childName">{selectedRoom.childName}</span>
        </Paper>
        <div className="messages">
          {messages.map((message) => (
            <Message message={message} key={message.messageId}/>
          ))}
        </div>
      </div>
      <form className="form" onSubmit={form.onSubmit(handleAddMessage as any)}>
        {/* message input */}
        <div className="messageInput">
          <Textarea
            label="Message"
            autosize
            minRows={2}
            withAsterisk
            {...form.getInputProps("message")}
          />
        </div>

        {/* Attatchments  */}
        <div className="attachments">
          <FileInput
            label="Attachments"
            placeholder="Upload files"
            accept="image/png,image/jpeg"
            {...form.getInputProps("attachments")}
          />
        </div>
        {/* Send button */}
        <div className="button">
          <Button
            className="button"
            variant="filled"
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};
AddMessageModalComponent.displayName = "AddMessageModal";

export const AddMessageModal = AddMessageModalComponent;
