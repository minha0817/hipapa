import { FC, PropsWithChildren } from "react";

import styles from "./sleep.styles.module.scss";
import { Button, Paper, Textarea, Title } from "@mantine/core";
import { PhotoUploadButton } from "@/components/photoUploadButton/photoUploadButton.component";
import { TimeInputField } from "@/components/timeInputField/timeInputField.component";
import { type } from "os";

type SleepProps = {
  // ...
  selectedChildren: string[]
};

const SleepComponent: FC<PropsWithChildren<SleepProps>> = ({selectedChildren}) => {
  return (
    <div className={styles.sleep}>
      <div style={{ maxWidth: "45rem" }}>
        <Paper shadow="xs" radius="md" p="md">
          <Title order={4}>Sleep Report</Title>
          {/* time input */}
          <div className="timeInput">
            <TimeInputField label="Start Time"/>
          </div>
          <div className="timeInput">
            <TimeInputField label="End Time"/>
          </div>
          {/* description input */}
          <div className="descriptionField">
            <Textarea
              placeholder="Add description"
              label="Description"
              autosize
              minRows={3}
              onChange={(e) => console.log(e.target.value)}
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
              Clear
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};
SleepComponent.displayName = "Sleep";

export const Sleep = SleepComponent;
