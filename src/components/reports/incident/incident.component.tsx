"use client";
import { FC, PropsWithChildren, useRef, useState } from "react";

import styles from "./incident.styles.module.scss";
import { Button, Paper, Textarea, Title } from "@mantine/core";
import { PhotoUploadButton } from "@/components/photoUploadButton/photoUploadButton.component";
import { TimeInputField } from "@/components/timeInputField/timeInputField.component";

type IncidentProps = {
  type: string
};

const IncidentComponent: FC<PropsWithChildren<IncidentProps>> = ({type}) => {

  return (
    <div className={styles.incident}>
      <div style={{ maxWidth: "45rem" }}>
        <Paper shadow="xs" radius="md" p="md">
          <Title order={4}>{`${type} Report`}</Title>
          {/* time input */}
          <div className="timeInput">
            <TimeInputField label="Time"/>
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
IncidentComponent.displayName = "Incident";

export const Incident = IncidentComponent;
