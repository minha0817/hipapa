import { FC, PropsWithChildren } from "react";
import styles from "./mealReport.styles.module.scss";
import { MealReport as Meal } from "@/app/api/getReport/types";
import { Paper } from "@mantine/core";
import { DateTime } from "luxon";

type MealReportProps = {
  report: Meal;
};

const MealReportComponent: FC<PropsWithChildren<MealReportProps>> = ({
  report,
}) => {
  return (
    <Paper className={styles.mealReport} shadow="sm" radius="lg" p="xl">
      <p>Meal</p>
      <p>{DateTime.fromISO(report.mealReportTime).toFormat("yy LLL dd hh:mm:ss a ")}</p>
      <p>{report.mealReportImage}</p>
      <p>{report.mealType}</p>
      <p>{report.quantity}</p>
      <p>{report.mealReportDescription}</p>
    </Paper>
  );
};
MealReportComponent.displayName = "MealReport";

export const MealReport = MealReportComponent;
