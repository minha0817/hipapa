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

type AddAdminMessagesModalProps = {
  childrenList: Child[];
};

const AddAdminMessagesModalComponent: FC<
  PropsWithChildren<AddAdminMessagesModalProps>
> = ({ childrenList }) => {
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
    // Add api
  };

  return (
    <form
      className={styles.addAdminMessagesModal}
      onSubmit={form.onSubmit(handleAddAdminMessages as any)}
    >
      {/* multi select으로 애들 리스트 보여주기 */}
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
      <div className="button">
        <Button className="button" type="submit">
          Send
        </Button>
      </div>
      {/* Send button */}
    </form>
  );
};
AddAdminMessagesModalComponent.displayName = "AddAdminMessagesModal";

export const AddAdminMessagesModal = AddAdminMessagesModalComponent;
