import { FC, PropsWithChildren } from "react";

import { useRef } from "react";
import { ActionIcon } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import styles from "./timeInputField.styles.module.scss";

type TimeInputFieldProps = {
  // ...
  label: string;
};

const TimeInputFieldComponent: FC<
  PropsWithChildren<TimeInputFieldProps>
> = ({label}) => {
  const ref = useRef<HTMLInputElement>(null);
  
  return (
    <TimeInput
      label={label}
      ref={ref}
      rightSection={
        <ActionIcon onClick={() => ref.current?.showPicker()}>
          <IconClock size="1rem" stroke={1.5} />
        </ActionIcon>
      }
      maw={400}
      onChange={(e) => console.log("e ---------- ", e.target.value)}
    />
  );
};
TimeInputFieldComponent.displayName = "TimeInputField";

export const TimeInputField = TimeInputFieldComponent;
