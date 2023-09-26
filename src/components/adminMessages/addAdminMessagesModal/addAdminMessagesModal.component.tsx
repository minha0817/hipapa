"use client";
import { FC, PropsWithChildren } from "react";

import styles from "./addAdminMessagesModal.styles.module.scss";
import {
  Button,
  FileInput,
  MultiSelect,
  TextInput,
  Textarea,
} from "@mantine/core";
import { Child } from "@/dbModels/types";
import { useForm, zodResolver } from "@mantine/form";
import {
  AddAdminMessagsModalForm,
  addAdminMessagsModalSchema,
} from "./addAdminMessagesModal.types";
import axios, { AxiosResponse } from "axios";

type AddAdminMessagesModalProps = {
  childrenList: Child[];
  close: () => void
};

const AddAdminMessagesModalComponent: FC<
  PropsWithChildren<AddAdminMessagesModalProps>
> = ({ childrenList,close }) => {
  //get the list of children's id and name
  //Question : select all children 은 어떻게 만들어야 할지, 
  const multiSelectChildren = childrenList.map((child) => {
    return {
      label: child.name,
      value: child.child_id,
    };
  });
  
  const form = useForm<Partial<AddAdminMessagsModalForm>>({
    validate: zodResolver(addAdminMessagsModalSchema),
    initialValues: {
      childrenIds: [],
      title: "",
      body: "",
    },
  });

  const handleAddAdminMessages = (values: AddAdminMessagsModalForm) => {
    console.log("AddAdminMessages values", values);
    axios
    .post<Response, AxiosResponse<Response>>("/api/createMessage", {
      values,
    })
    .then((res) => res.data)
    .catch((error) => {
      const {
        response: { data, status },
      } = error;
      console.error(`Failed: ${status}`, data);
    })
    .then(close)
  };

  return (
    <form
      className={styles.addAdminMessagesModal}
      onSubmit={form.onSubmit(handleAddAdminMessages as any)}
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
AddAdminMessagesModalComponent.displayName = "AddAdminMessagesModal";

export const AddAdminMessagesModal = AddAdminMessagesModalComponent;
