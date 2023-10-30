"use client";
import { FC, PropsWithChildren } from "react";

import styles from "./addAdminMessagesRoomModal.styles.module.scss";
import {
  Button,
  FileInput,
  MultiSelect,
  TextInput,
  Textarea,
} from "@mantine/core";
import { Child } from "@/app/api/getChild/types";
import { useForm, zodResolver } from "@mantine/form";

import axios, { AxiosResponse } from "axios";
import { AddParentMessagsRoomModalForm, addParentMessagsRoomModalSchema } from "./addParentMessageRoomModal.types";

type AddAdminMessagesRoomModalProps = {
  childrenList: Child[];
  close: () => void;
};

const AddAdminMessagesRoomModalComponent: FC<
  PropsWithChildren<AddAdminMessagesRoomModalProps>
> = ({ childrenList, close }) => {
  const multiSelectChildren = childrenList.map((child) => {
    return {
      label: child.name,
      value: child.childId,
    };
  });

  const form = useForm<Partial<AddParentMessagsRoomModalForm>>({
    validate: zodResolver(addParentMessagsRoomModalSchema),
    initialValues: {
      title: "",
      body: "",
      attachments: "",
    },
  });

  const handleAddAdminRoomMessages = (values: AddParentMessagsRoomModalForm) => {

    const formattedValues = {
          childrenIds: [childrenList[0].childId],
          title: values.title,
          body: values.body,
          attachments: values.attachments,
        }

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
      className={styles.addAdminMessagesRoomModal}
      onSubmit={form.onSubmit(handleAddAdminRoomMessages as any)}
    >
      {/* multi select */}
      <div className="multiSelect">
        <MultiSelect
          label="Send To"
          withAsterisk
          data={multiSelectChildren}
          withinPortal
          placeholder="Select children"
          {...form.getInputProps("childrenIds")}
        />
      </div>
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
AddAdminMessagesRoomModalComponent.displayName = "AddAdminMessagesRoomModal";

export const AddAdminMessagesRoomModal = AddAdminMessagesRoomModalComponent;
