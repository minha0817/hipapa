import { FC, PropsWithChildren } from "react";

import styles from "./incideReport.styles.module.scss";
import { Paper } from "@mantine/core";
import { IncidentReport } from "@/app/api/getReport/types";
import { DateTime } from "luxon";

type IncideReportProps = {
  type: string;
  report: IncidentReport;
};

const IncideReportComponent: FC<PropsWithChildren<IncideReportProps>> = ({
  type,
  report,
}) => {
  return (
    <Paper className={styles.incideReport} shadow="sm" radius="lg" p="xl">
      <p>{type}</p>
      <p>{DateTime.fromISO(report.reportTime).toFormat("yy LLL dd hh:mm:ss a ")}</p>
      <p>{report.reportImage}</p>
      <p>{report.reportDescription}</p>
    </Paper>
  );
};
IncideReportComponent.displayName = "IncideReport";

export const IncideReport = IncideReportComponent;
