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
import { useForm, zodResolver } from "@mantine/form";
import { AddMealForm, addMealSchema } from "./meal.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createMealReport } from "@/api/reports/meal/meal.apis";
import axios, { AxiosResponse } from "axios";

const mealData = [
  { value: "morning_snack", label: "Morning Snack" },
  { value: "lunch", label: "Lunch" },
  { value: "afternoon_snack", label: "Afternoon Snack" },
];

type MealProps = {
  selectedChildren: string[];
};

const MealComponent: FC<PropsWithChildren<MealProps>> = ({
  selectedChildren,
}) => {
  const supabase = createClientComponentClient();

  const form = useForm<Partial<AddMealForm>>({
    validate: zodResolver(addMealSchema),
    initialValues: {
      time: "",
      description: "",
    },
  });

  const handleAddMealReport = (values: AddMealForm) => {
    createMealReport(supabase, selectedChildren, values)
    // axios
    //   .post<Response, AxiosResponse<Response>>("/api/reports/meal", {
    //     childrenIds: selectedChildren,
    //     values,
    //   })
    //   .then((res) => res.data)
    //   .catch((error) => {
    //     const {
    //       response: { data, status },
    //     } = error;
    //     console.error(`Failed: ${status}`, data);
    //   });
  };

  const handleClearForm = () => {
    form.reset();
  };

  return (
    <form
      className={styles.meal}
      style={{ maxWidth: "45rem" }}
      onSubmit={form.onSubmit(handleAddMealReport as any)}
    >
      <Paper shadow="xs" radius="md" p="md">
        <Title order={4}>Meal Report</Title>
        {/* time input */}
        <div className="timeInput">
          <TimeInputField label="Time" form={form} propName="time" />
        </div>
        {/* Meal type */}
        <Select
          label="Meal Type"
          placeholder="Select Meal Type"
          data={mealData}
          style={{ maxWidth: 400 }}
          withAsterisk
          {...form.getInputProps("mealType")}
        />
        {/* Quantity radio type */}
        <Radio.Group
          label="Quantity"
          withAsterisk
          style={{ margin: "1rem 0 1rem 0" }}
          {...form.getInputProps("quantity")}
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
    </form>
  );
};
MealComponent.displayName = "Meal";

export const Meal = MealComponent;
