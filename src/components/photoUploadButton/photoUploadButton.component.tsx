import { FC, PropsWithChildren, useState } from "react";
import { FileButton, Button, Group, Text, List } from "@mantine/core";
import styles from "./photoUploadButton.styles.module.scss";
import { AiFillCamera } from "react-icons/ai";

type PhotoUploadButtonProps = {
  // ...
};

const PhotoUploadButtonComponent: FC<
  PropsWithChildren<PhotoUploadButtonProps>
> = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <>
      <Group position="center">
        <FileButton onChange={setFiles} accept="image/png,image/jpeg" multiple>
          {(props) => (
            <Button {...props} variant="light" style={{marginRight: "1rem"}}>
              <AiFillCamera />&nbsp;Photo
            </Button>
          )}
        </FileButton>
      </Group>

      {files.length > 0 && (
        <Text size="sm" mt="sm">
          Picked files:
        </Text>
      )}

      <List size="sm" mt={5} withPadding>
        {files.map((file, index) => (
          <List.Item key={index}>{file.name}</List.Item>
        ))}
      </List>
    </>
  );
};
PhotoUploadButtonComponent.displayName = "PhotoUploadButton";

export const PhotoUploadButton = PhotoUploadButtonComponent;
