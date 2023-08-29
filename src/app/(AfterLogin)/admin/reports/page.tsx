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

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState("");

  const supabase = createClientComponentClient();

  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    getChildren(supabase).then((data) => setChildren(data));
  }, []);

  const handleButtons = (report: string) => {
    setSelectedReport(report);
  };
  return (
    <>
      <h1>Reports</h1>
      <Children children={children}/>

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

      {selectedReport === "incident" && <Incident />}
      {selectedReport === "activity" && <Activity />}
      {selectedReport === "meal" && <Meal />}
      {selectedReport === "toilet" && <Toilet />}

      {/* Add back to top button component*/}
      <Affix />
    </>
  );
};

export default ReportsPage;
