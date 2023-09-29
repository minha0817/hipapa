import { FC, PropsWithChildren } from "react";

import styles from "./addMessageModal.styles.module.scss";
import {
  MultiSelect,
  TextInput,
  Textarea,
  FileInput,
  Button,
} from "@mantine/core";

type AddMessageModalProps = {
  // ...
};

const AddMessageModalComponent: FC<
  PropsWithChildren<AddMessageModalProps>
> = () => {

//Form 

  const handleAddMessage = () => {}

  return (
    <div className={styles.addMessageModal}>
      {/* 여기에 메세지 리스트 보여주기 */}
      <form
        className={styles.addAdminMessagesRoomModal}
        // onSubmit={form.onSubmit(handleAddMessage as any)}
      >
        {/* Body input */}
        <div className="body">
          <Textarea
            label="Body"
            autosize
            minRows={4}
            withAsterisk
            // {...form.getInputProps("body")}
          />
        </div>

        {/* Attatchments  */}
        <div className="attachments">
          <FileInput
            label="Attachments"
            placeholder="Upload files"
            accept="image/png,image/jpeg"
            // {...form.getInputProps("attachments")}
          />
        </div>
        {/* Send button */}
        <div className="button">
          <Button className="button" type="submit">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};
AddMessageModalComponent.displayName = "AddMessageModal";

export const AddMessageModal = AddMessageModalComponent;
