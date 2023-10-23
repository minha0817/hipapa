import { FC, PropsWithChildren } from "react";

import styles from "./sleepReport.styles.module.scss";
import { Paper } from "@mantine/core";
import { SleepReport as Sleep } from "@/app/api/getReport/types";
import { DateTime } from "luxon";

type SleepReportProps = {
  report: Sleep;
};

const SleepReportComponent: FC<PropsWithChildren<SleepReportProps>> = ({
  report,
}) => {
  return (
    <Paper className={styles.mealReport} shadow="sm" radius="lg" p="xl">
      <p>Sleep</p>
      <p>{report.sleepReportImage}</p>
      <p>{DateTime.fromISO(report.napStart).toFormat("yy LLL dd hh:mm:ss a ")}</p>
      <p>{DateTime.fromISO(report.napEnd).toFormat("yy LLL dd hh:mm:ss a ")}</p>
      <p>{report.sleepReportDescription}</p>
    </Paper>
  );
};
SleepReportComponent.displayName = "SleepReport";

export const SleepReport = SleepReportComponent;
