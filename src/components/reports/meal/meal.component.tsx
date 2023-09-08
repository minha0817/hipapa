import { FC, PropsWithChildren } from "react";

import styles from "./meal.styles.module.scss";
import { TimeInputField } from "@/components/timeInputField/timeInputField.component";
import {
  Button,
  Group,
  Paper,
  Radio,
  Select,
  Textarea,
  Title,
} from "@mantine/core";
import { PhotoUploadButton } from "@/components/photoUploadButton/photoUploadButton.component";

const mealData = [
  { value: "morningSnack", label: "Morning Snack" },
  { value: "lunch", label: "Lunch" },
  { value: "afternoonSnack", label: "Afternoon Snack" },
];

type MealProps = {
  // ...
};

const MealComponent: FC<PropsWithChildren<MealProps>> = () => {
  return (
    <div className={styles.meal} style={{ maxWidth: "45rem" }}>
      <Paper shadow="xs" radius="md" p="md">
        <Title order={4}>Meal Report</Title>
        {/* time input */}
        <div className="timeInput">
          <TimeInputField label="Time"/>
        </div>
        {/* Meal type */}
        <Select
          label="Meal Type"
          placeholder="Select Meal Type"
          data={mealData}
          style={{maxWidth: 400}}
        />
        {/* Quantity radio type */}
        <Radio.Group
          // name="favoriteFramework"
          label="Quantity"
          style={{margin: "1rem 0 1rem 0"}}
        >
          <Group mt="xs">
            <Radio value="all" label="All" />
            <Radio value="most" label="Most" />
            <Radio value="some" label="Some" />
            <Radio value="none" label="None" />
          </Group>
        </Radio.Group>
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
  );
};
MealComponent.displayName = "Meal";

export const Meal = MealComponent;
