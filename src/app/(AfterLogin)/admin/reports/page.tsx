"use client";
import { getChildren } from "@/api/get";
import { Affix } from "@/components/affix/affix.component";
import { Children } from "@/components/children/children.component";
import { Incident } from "@/components/reports/incident/incident.component";
import { Meal } from "@/components/reports/meal/meal.component";
import { Child } from "@/dbModels/types";
import { Button, Divider } from "@mantine/core";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import styles from "./adminReportsPage.module.scss";
import { Sleep } from "@/components/reports/sleep/sleep.component";

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState("");
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);

  const supabase = createClientComponentClient();

  const [children, setChildren] = useState<Child[]>([]);
  
  useEffect(() => {
    getChildren(supabase).then((data) => setChildren(data));
  }, []);

  //Set a report 
  const handleButtons = (report: string) => {
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

  //Get all children's id
  const allChildrenIds = children.map((child) => {
    return child.child_id;
  });

  //Handle Select All Children button.
  const handleSelectAllChildren = () => {
    setSelectedChildren((prevSelectedChildren) => {
      if (prevSelectedChildren.length === allChildrenIds.length) {
        return [];
      } else {
        return allChildrenIds;
      }
    });
  };

  const handleIncidentReportInput = (property: string, value: string) => {

  }

  return (
    <div className={styles.adminReports}>
      <Divider my="xs" label="Apply to" labelPosition="center" size="xl" style={{maxWidth: 200}}/>
      <div className="childrenList">
        <Children
          childrenList={children}
          handleSelectChildren={handleSelectChildren}
          selectedChildren={selectedChildren}
        />
      </div>
      <div className="selectAllBtn">
        <Button variant="light" onClick={handleSelectAllChildren} style={{minWidth: 200}}>
          Select All Children
        </Button>
      </div>
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

      {selectedReport === "Incident" && <Incident type={selectedReport} selectedChildren={selectedChildren}/>}
      {selectedReport === "Activity" && <Incident type={selectedReport} selectedChildren={selectedChildren}/>}
      {selectedReport === "Meal" && <Meal selectedChildren={selectedChildren}/>}
      {selectedReport === "Sleep" && <Sleep selectedChildren={selectedChildren}/>}

      {/* Scroll to top button */}
      <Affix />
    </div>
  );
};

export default ReportsPage;
