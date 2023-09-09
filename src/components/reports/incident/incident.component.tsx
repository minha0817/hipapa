"use client";
import { FC, PropsWithChildren, useState } from "react";

import styles from "./incident.styles.module.scss";
import { Button, Paper, Textarea, Title } from "@mantine/core";
import { PhotoUploadButton } from "@/components/photoUploadButton/photoUploadButton.component";
import { TimeInputField } from "@/components/timeInputField/timeInputField.component";
import { useForm, zodResolver } from "@mantine/form";
import { AddIncidentForm, addIncidentSchema } from "./incident.types";
import { createIncidentReport } from "@/api/reports/incident/incident.apis";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type IncidentProps = {
  type: string;
  selectedChildren: string[];
};

const IncidentComponent: FC<PropsWithChildren<IncidentProps>> = ({
  type,
  selectedChildren,
}) => {
  const form = useForm<Partial<AddIncidentForm>>({
    validate: zodResolver(addIncidentSchema),
    initialValues: {
      time: "",
      description: "",
    },
  });

  const supabase = createClientComponentClient();

  const handleAddIncidentReport = (values: AddIncidentForm) => {
      createIncidentReport(supabase, selectedChildren, values, type);
  };

  return (
    // Question : handleAddIncidentReport typing???
    <form
      className={styles.incident}
      onSubmit={form.onSubmit(handleAddIncidentReport as any)}
    >
      <div style={{ maxWidth: "45rem" }}>
        <Paper shadow="xs" radius="md" p="md">
          <Title order={4}>{`${type} Report`}</Title>
          {/* time input */}
          <div className="timeInput">
            <TimeInputField label="Time" form={form} propName="time"/>
          </div>
          {/* description input */}
          <div className="descriptionField">
            <Textarea
              placeholder="Add description"
              label="Description"
              autosize
              minRows={3}
              {...form.getInputProps("description")}
            />
          </div>
          {/* photo upload button */}
          <div className="photoUploadBtn">
            <PhotoUploadButton />
          </div>
          {/* submit and cancel button */}
          <div className="buttons">
            <Button className="button" type="submit">
              Submit
            </Button>
            <Button className="button" variant="outline">
              Clear
            </Button>
          </div>
        </Paper>
      </div>
    </form>
  );
};
IncidentComponent.displayName = "Incident";

export const Incident = IncidentComponent;
