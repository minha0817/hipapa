import { FC, PropsWithChildren } from "react";

import styles from "./mealReport.styles.module.scss";
import { MealReport as Meal } from "@/app/api/getReport/types";
import { Paper } from "@mantine/core";

type MealReportProps = {
  report: Meal;
};

const MealReportComponent: FC<PropsWithChildren<MealReportProps>> = ({
  report,
}) => {
  return (
    <Paper className={styles.mealReport} shadow="sm" radius="lg" p="xl">
      <p>Meal</p>
      <p>{report.mealReportTime}</p>
      <p>{report.mealReportImage}</p>
      <p>{report.mealType}</p>
      <p>{report.quantity}</p>
      <p>{report.mealReportDescription}</p>
    </Paper>
  );
};
MealReportComponent.displayName = "MealReport";

export const MealReport = MealReportComponent;
