import { FC, PropsWithChildren } from "react";

import { useRef } from "react";
import { ActionIcon } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import styles from "./timeInputField.styles.module.scss";
import { UseFormReturnType } from "@mantine/form";
import { AddIncidentForm } from "../report/incident/incident.types";

type TimeInputFieldProps = {
  label: string;
  form: UseFormReturnType<Partial<AddIncidentForm>>;
  propName: string;
};

const TimeInputFieldComponent: FC<PropsWithChildren<TimeInputFieldProps>> = ({
  label,
  form,
  propName,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <TimeInput
      label={label}
      ref={ref}
      withAsterisk
      rightSection={
        <ActionIcon onClick={() => ref.current?.showPicker()}>
          <IconClock size="1rem" stroke={1.5} />
        </ActionIcon>
      }
      maw={400}
      {...form.getInputProps(`${propName}`)}
    />
  );
};
TimeInputFieldComponent.displayName = "TimeInputField";

export const TimeInputField = TimeInputFieldComponent;
