"use client";
import { getChildren } from "@/api/get";
import { Affix } from "@/components/affix/affix.component";
import { Children } from "@/components/children/children.component";
import { Activity } from "@/components/reports/activity/activity.component";
import { Incident } from "@/components/reports/incident/incident.component";
import { Meal } from "@/components/reports/meal/meal.component";
import { Toilet } from "@/components/reports/toilet/toilet.component";
import { Child } from "@/dbModels/types";
import { Button } from "@mantine/core";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import styles from "./adminReportsPage.module.scss";

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState("");
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);

  const supabase = createClientComponentClient();

  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    getChildren(supabase).then((data) => setChildren(data));
  }, []);

  const handleButtons = (report: string) => {
    setSelectedReport(report);
  };

  const handleSelectChildren = (childId: string, index: number) => {
    setSelectedChildren((prevSelectedChildren) => {
      // Check if the childId is already in the selectedChild array
      const isAlreadySelected = prevSelectedChildren.includes(childId);

      // If it's already selected, remove it; otherwise, add it
      if (isAlreadySelected) {
        return prevSelectedChildren.filter((id) => id !== childId);
      } else {
        return [...prevSelectedChildren, childId];
      }
    });
  };

  return (
    <div className={styles.adminReports}>
      <h1>Reports</h1>
      <div className="childrenList">
        <Children
          childrenList={children}
          handleSelectChildren={handleSelectChildren}
          selectedChildren={selectedChildren}
        />
      </div>
      <div className="selectAllBtn">
        <Button variant="light">Select All Children</Button>
      </div>
      <div className="groupBtn">
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
      </div>

      {selectedReport === "incident" && <Incident />}
      {selectedReport === "activity" && <Activity />}
      {selectedReport === "meal" && <Meal />}
      {selectedReport === "toilet" && <Toilet />}

      {/* Add back to top button component*/}
      <Affix />
    </div>
  );
};

export default ReportsPage;
