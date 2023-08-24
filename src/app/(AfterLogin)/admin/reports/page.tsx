"use client";
import { Children } from "@/components/children/children.component";
import { Activity } from "@/components/reports/activity/activity.component";
import { Incident } from "@/components/reports/incident/incident.component";
import { Meal } from "@/components/reports/meal/meal.component";
import { Toilet } from "@/components/reports/toilet/toilet.component";
import { Button } from "@mantine/core";
import { useState } from "react";

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState("");

  const handleButtons = (report: string) => {
    setSelectedReport(report);
  };
  return (
    <>
      <h1>Reports</h1>
      <Children />

      <Button.Group>
        <Button variant="default" onClick={() => handleButtons("incident")}>
          Incident
        </Button>
        <Button variant="default" onClick={() => handleButtons("activity")}>
          Activity
        </Button>
        <Button variant="default" onClick={() => handleButtons("meal")}>
          Meal
        </Button>
        <Button variant="default" onClick={() => handleButtons("toilet")}>
          Toilet
        </Button>
      </Button.Group>

      {/* Display different reports of component depends on the state */}
      {selectedReport === "incident" && <Incident />}
      {selectedReport === "activity" && <Activity />}
      {selectedReport === "meal" && <Meal />}
      {selectedReport === "toilet" && <Toilet />}
    </>
  );
};

export default ReportsPage;
