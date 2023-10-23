"use client";
import { Child } from "@/app/api/getChild/types";
import { CurrentTime } from "@/components/currentTime/currentTime.component";
import { Avatar, Badge, Paper } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./parentHomePage.styles.module.scss";
import { Reports } from "@/app/api/getReport/types";
import { IncideReport } from "@/components/childReport/incideReport/incideReport.component";
import { MealReport } from "@/components/childReport/mealReport/mealReport.component";
import { SleepReport } from "@/components/childReport/sleepReport/sleepReport.component";

const ParentHomePage = () => {
  const [child, setChild] = useState<Child>();
  const [reports, setReports] = useState<Reports>();

  useEffect(() => {
    axios
      .post("/api/getChild")
      .then((res) => {
        setChild(res.data);
      })
      .catch((error) => {
        const {
          response: { data, status },
        } = error;
        console.error(`Failed: ${status}`, data);
      });

    axios
      .post("/api/getReport")
      .then((res) => {
        
        setReports(res.data);
      })
      .catch((error) => {
        const {
          response: { data, status },
        } = error;
        console.error(`Failed: ${status}`, data);
      });
  }, []);

  if (!child) return;

  return (
    <div className={styles.parentHome}>
      <CurrentTime />
      <Paper shadow="sm" radius="lg" p="xl" className="title">
        <Avatar src="avatar.png" alt="it's me" />
        <p>{child.childName}</p>
      </Paper>

      {/* Reports  */}
      {reports?.activityReports &&
        reports?.activityReports.map((acReport) => (
          <IncideReport
            type="Activity"
            report={acReport}
            key={acReport.reportId}
          />
        ))}
      {reports?.incidentReports &&
        reports?.incidentReports.map((inReport) => (
          <IncideReport
            type="Incident"
            report={inReport}
            key={inReport.reportId}
          />
        ))}
      {reports?.mealReports &&
        reports?.mealReports.map((mealReport) => (
          <MealReport report={mealReport} key={mealReport.mealReportId} />
        ))}

      {reports?.sleepReports &&
        reports?.sleepReports.map((sleepReport) => (
          <SleepReport report={sleepReport} key={sleepReport.sleepReportId} />
        ))}
    </div>
  );
};

export default ParentHomePage;
