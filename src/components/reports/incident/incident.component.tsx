import { FC, PropsWithChildren } from "react";

import styles from "./incident.styles.module.scss";
import { Button, Paper, Textarea, Title } from "@mantine/core";
import { PhotoUploadButton } from "@/components/photoUploadButton/photoUploadButton.component";
import { TimeInputField } from "@/components/timeInputField/timeInputField.component";

type IncidentProps = {
  // ...
};

const IncidentComponent: FC<PropsWithChildren<IncidentProps>> = () => {
  return (
    <div className={styles.incident}>
      <div style={{ maxWidth: "45rem" }}>
        <Paper shadow="xs" radius="md" p="md">
          <Title order={4}>Incident reports</Title>
          {/* time input */}
          <div className="timeInput">
            <TimeInputField />
          </div>
          {/* description input */}
          <div className="descriptionField">
            <Textarea
              placeholder="Add description"
              label="Description"
              autosize
              minRows={3}
            />
          </div>
          {/* photo upload button */}
          <div className="photoUploadBtn">
            <PhotoUploadButton />
          </div>
          {/* submit and cancel button */}
          <div className="buttons">
            <Button className="button">Submit</Button>
            <Button className="button" variant="outline">
              Cancel
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};
IncidentComponent.displayName = "Incident";

export const Incident = IncidentComponent;
