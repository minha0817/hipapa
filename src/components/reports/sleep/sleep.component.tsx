import { FC, PropsWithChildren } from "react";

import styles from "./sleep.styles.module.scss";
import { Button, Paper, Textarea, Title } from "@mantine/core";
import { PhotoUploadButton } from "@/components/photoUploadButton/photoUploadButton.component";
import { TimeInputField } from "@/components/timeInputField/timeInputField.component";
import { AddSleepForm, addSleepSchema } from "./sleep.types";
import { useForm, zodResolver } from "@mantine/form";
import { createSleepReport } from "@/api/reports/sleep/sleep.apis";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type SleepProps = {
  selectedChildren: string[];
};

const SleepComponent: FC<PropsWithChildren<SleepProps>> = ({
  selectedChildren,
}) => {
  const form = useForm<Partial<AddSleepForm>>({
    validate: zodResolver(addSleepSchema),
    initialValues: {
      startTime: "",
      endTime: "",
      description: "",
    },
  });

  const supabase = createClientComponentClient();

  const handleAddSleepReport = (values: AddSleepForm) => {
    createSleepReport(supabase, selectedChildren, values);
  };

  const handleClearForm = () => {
    form.reset();
  };

  return (
    <form
      className={styles.sleep}
      onSubmit={form.onSubmit(handleAddSleepReport as any)}
    >
      <div style={{ maxWidth: "45rem" }}>
        <Paper shadow="xs" radius="md" p="md">
          <Title order={4}>Sleep Report</Title>
          {/* time input */}
          <div className="timeInput">
            <TimeInputField
              label="Start Time"
              form={form}
              propName="startTime"
            />
          </div>
          <div className="timeInput">
            <TimeInputField label="End Time" form={form} propName="endTime" />
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
            <Button className="button" variant="outline" onClick={handleClearForm}>
              Clear
            </Button>
          </div>
        </Paper>
      </div>
    </form>
  );
};
SleepComponent.displayName = "Sleep";

export const Sleep = SleepComponent;
