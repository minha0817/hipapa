import { AddIncidentForm } from "@/components/reports/incident/incident.types";
import { Database } from "@/supabase.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";

export const createIncidentReport = async (
  supabase: SupabaseClient<Database>,
  childrenIds: string[],
  values: AddIncidentForm,
  type: string
) => {
  //Need this to format values.time which is string into timestamptz
  const [hours, minutes] = values.time.split(":").map(Number);
  const dt = DateTime.local().set({
    hour: hours,
    minute: minutes,
    second: 0,
    millisecond: 0,
  });
  const formattedDate = dt.toISO();

  //Handle create Incident reports
  if (type === "Incident" && formattedDate) {
    handleIncidentReport(supabase, childrenIds, values, formattedDate);
  }
  //Handle create Activity reports
  if (type === "Activity" && formattedDate) {
    handleActivityReport(supabase, childrenIds, values, formattedDate);
  }
};

async function handleIncidentReport(
  supabase: SupabaseClient<Database>,
  childrenIds: string[],
  values: AddIncidentForm,
  formattedDate: string,
) {
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
      incident_report_id: incidentReportId.incident_report_id,
    };
  });

  //Insert report_children
  const { error: reportChildrenError } = await supabase
    .from("report_children")
    .insert(reportChildrenData);
  if (reportChildrenError) throw reportChildrenError;
}

async function handleActivityReport(
  supabase: SupabaseClient<Database>,
  childrenIds: string[],
  values: AddIncidentForm,
  formattedDate: string,
) {
  //Insert Activity report
  const { data: activityReportId, error: activityReportError } = await supabase
    .from("activity_reports")
    .insert({ time: formattedDate, description: values.description })
    .select("activity_report_id")
    .single();

  if (activityReportError) throw activityReportError;

  const reportChildrenData = childrenIds.map((x) => {
    return {
      child_id: x,
      activity_report_id: activityReportId.activity_report_id,
    };
  });

  //Insert report_children
  const { error: reportChildrenError } = await supabase
    .from("report_children")
    .insert(reportChildrenData);
  if (reportChildrenError) throw reportChildrenError;
}
