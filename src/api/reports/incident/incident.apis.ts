import { AddIncidentForm } from "@/components/reports/incident/incident.types";
import { Database } from "@/supabase.types";
import { SupabaseClient } from "@supabase/supabase-js";
import {DateTime} from "luxon";

export const createIncidentReport = async (
  supabase: SupabaseClient<Database>,
  childrenIds: string[],
  values: AddIncidentForm
) => {
  //Need this to format values.time which is string into timestamptz
  const [hours, minutes] = values.time.split(":").map(Number);
  const dt = DateTime.local().set({ hour: hours, minute: minutes, second: 0, millisecond: 0 });
  const formattedDate = dt.toISO();
  

  //Insert incidentReport
  const { data: incidentReportId, error: incidentReportError } = await supabase
    .from("incident_reports")
    .insert({ time: formattedDate, description: values.description })
    .select("incident_report_id")
    .single();

  if (incidentReportError) throw incidentReportError;

  const reportChildrenData = childrenIds.map((x) => {
    return {
      child_id: x,
      incident_report_id: incidentReportId.incident_report_id
    }
  })

  //Insert report_children
  const { error: reportChildrenError } = await supabase
    .from("report_children")
    .insert(reportChildrenData);
  if (reportChildrenError) throw reportChildrenError;
};
