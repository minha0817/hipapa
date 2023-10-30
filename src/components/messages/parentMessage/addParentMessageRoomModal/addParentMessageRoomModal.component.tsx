"use client";
import { FC, PropsWithChildren } from "react";
import { Button, FileInput, TextInput, Textarea } from "@mantine/core";
import { Child } from "@/app/api/getChild/types";
import { useForm, zodResolver } from "@mantine/form";

import axios, { AxiosResponse } from "axios";
import {
  AddParentMessagsRoomModalForm,
  addParentMessagsRoomModalSchema,
} from "./addParentMessageRoomModal.types";
import styles from "./addParentMessageRoomModal.styles.module.scss";

type AddParentMessagesRoomModalProps = {
  childrenList: Child[];
  close: () => void;
};

const AddParentMessagesRoomModalComponent: FC<
  PropsWithChildren<AddParentMessagesRoomModalProps>
> = ({ childrenList, close }) => {
  const form = useForm<Partial<AddParentMessagsRoomModalForm>>({
    validate: zodResolver(addParentMessagsRoomModalSchema),
    initialValues: {
      title: "",
      body: "",
      attachments: "",
    },
  });

  const handleAddParentRoomMessages = (
    values: AddParentMessagsRoomModalForm
  ) => {
    const formattedValues = {
      childrenIds: [childrenList[0].childId],
      title: values.title,
      body: values.body,
      attachments: values.attachments,
    };

    axios
      .post<Response, AxiosResponse<Response>>(
        "/api/createMessageRoom",
        formattedValues
      )
      .then((res) => res.data)
      .catch((error) => {
        const {
          response: { data, status },
        } = error;
        console.error(`Failed: ${status}`, data);
      })
      .then(close);
  };

  return (
    <form
      className={styles.addParentMessagesRoomModal}
      onSubmit={form.onSubmit(handleAddParentRoomMessages as any)}
    >
      {/* Subject input */}
      <div className="title">
        <TextInput
          label="Title"
          withAsterisk
          {...form.getInputProps("title")}
        />
      </div>
      {/* Body input */}
      <div className="body">
        <Textarea
          label="Body"
          autosize
          minRows={4}
          withAsterisk
          {...form.getInputProps("body")}
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
        <Button className="button" type="submit">
          Send
        </Button>
      </div>
    </form>
  );
};
AddParentMessagesRoomModalComponent.displayName = "AddParentMessagesRoomModal";

export const AddParentMessagesRoomModal = AddParentMessagesRoomModalComponent;
