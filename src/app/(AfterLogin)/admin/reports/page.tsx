"use client";
import { getChildren } from "@/app/api/get";
import { Affix } from "@/components/affix/affix.component";
import { Children } from "@/components/children/children.component";
import { Incident } from "@/components/report/incident/incident.component";
import { Meal } from "@/components/report/meal/meal.component";
import { Child } from "@/dbModels/types";
import { Button, Divider } from "@mantine/core";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import styles from "./adminReportsPage.module.scss";
import { Sleep } from "@/components/report/sleep/sleep.component";

type ReportType = "Incident" | "Activity" | "Meal" | "Sleep";

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState<ReportType>("Incident");
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);

  const supabase = createClientComponentClient();

  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    getChildren(supabase).then((data) => setChildren(data));
  }, []);

  //Set a report
  const handleButtons = (report: ReportType) => {
    setSelectedReport(report);
  };

  //Set childrenIds after clicked
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

  //Handle Select All Children button.
  const handleSelectAllChildren = () => {
    //Get all children's id
    const allChildrenIds = children.map((child) => {
      return child.child_id;
    });

    setSelectedChildren((prevSelectedChildren) => {
      if (prevSelectedChildren.length === allChildrenIds.length) {
        return [];
      } else {
        return allChildrenIds;
      }
    });
  };

  //Reset selectedChildrenIds to empty.
  const resetSelectedChildren = () => {
    setSelectedChildren([]);
  }

  return (
    <div className={styles.adminReports}>
      <div className="leftBox">
        <Divider
          my="xs"
          label="Apply to"
          labelPosition="center"
          size="xl"
          style={{ maxWidth: 200 }}
        />
        <div className="childrenList">
          <Children
            childrenList={children}
            handleSelectChildren={handleSelectChildren}
            selectedChildren={selectedChildren}
          />
        </div>
        <div className="selectAllBtn">
          <Button
            variant="light"
            onClick={handleSelectAllChildren}
            style={{ minWidth: 200 }}
          >
            Select All Children
          </Button>
        </div>
      </div>
      <div className="rightBox">
        <div className="groupBtn">
          <Button.Group>
            <Button variant="default" onClick={() => handleButtons("Incident")}>
              Incident
            </Button>
            <Button variant="default" onClick={() => handleButtons("Activity")}>
              Activity
            </Button>
            <Button variant="default" onClick={() => handleButtons("Meal")}>
              Meal
            </Button>
            <Button variant="default" onClick={() => handleButtons("Sleep")}>
              Sleep
            </Button>
          </Button.Group>
        </div>

        {selectedReport === "Incident" && (
          <Incident type={selectedReport} selectedChildren={selectedChildren} resetSelectedChildren={resetSelectedChildren}/>
        )}
        {selectedReport === "Activity" && (
          <Incident type={selectedReport} selectedChildren={selectedChildren} resetSelectedChildren={resetSelectedChildren}/>
        )}
        {selectedReport === "Meal" && (
          <Meal selectedChildren={selectedChildren} resetSelectedChildren={resetSelectedChildren}/>
        )}
        {selectedReport === "Sleep" && (
          <Sleep selectedChildren={selectedChildren} resetSelectedChildren={resetSelectedChildren}/>
        )}
      </div>

      {/* Scroll to top button */}
      <Affix />
    </div>
  );
};

export default ReportsPage;
