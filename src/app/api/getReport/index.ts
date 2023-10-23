import { Database } from "@/supabase.types";
import { getCurrentUser } from "@/utils/supabaseHelper.utils";
import { SupabaseClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";
import { NextResponse } from "next/server";

export const getReport = async (supabase: SupabaseClient<Database>) => {
  //Get userId
  const user = await getCurrentUser(supabase);

  if (!user)
    throw NextResponse.json("User Not Found", {
      status: 404,
      statusText: "Not Found",
    });
  //Get childId
  const {
    data: childIdObj,
    error: childIdError,
    status,
    statusText,
  } = await supabase
    .from("children")
    .select("child_id")
    .eq("parent_id", user.id)
    .single();

  const childId = childIdObj?.child_id;
  //Get reports
  const { data: activityReports, error: activityReportError } = await supabase
    .from("report_children")
    .select("activity_reports(activity_report_id, time, description, photo)")
    .eq("child_id", childId)
    .not("activity_report_id", "is", null)
    .gte(
      "created_at",
      DateTime.now().setZone("America/Vancouver").startOf("day").toISO()
    );

  const { data: incidentReports, error: incidentReportError } = await supabase
    .from("report_children")
    .select("incident_reports(incident_report_id, time, description, photo)")
    .eq("child_id", childId)
    .not("incident_report_id", "is", null)
    .gte(
      "created_at",
      DateTime.now().setZone("America/Vancouver").startOf("day").toISO()
    );

  const { data: sleepReports, error: sleepReportError } = await supabase
    .from("sleep_reports")
    .select()
    .eq("child_id", childId)
    .gte(
      "created_at",
      DateTime.now().setZone("America/Vancouver").startOf("day").toISO()
    );

  const { data: mealReports, error: mealReportError } = await supabase
    .from("meal_reports")
    .select()
    .eq("child_id", childId)
    .gte(
      "created_at",
      DateTime.now().setZone("America/Vancouver").startOf("day").toISO()
    );

  return {
    activityReports: activityReports?.map((acReport) => ({
      reportId: acReport.activity_reports?.activity_report_id,
      reportTime: acReport.activity_reports?.time,
      reportDescription: acReport.activity_reports?.description,
      reportImage: acReport.activity_reports?.photo,
    })),
    incidentReports: incidentReports?.map((inReport) => ({
      reportId: inReport.incident_reports?.incident_report_id,
      reportTime: inReport.incident_reports?.time,
      reportDescription: inReport.incident_reports?.description,
      reportImage: inReport.incident_reports?.photo,
    })),
    sleepReports: sleepReports?.map((slReport) => ({
      sleepReportId: slReport.sleep_report_id,
      napStart: slReport.nap_start_time,
      napEnd: slReport.nap_end_time,
      sleepReportDescription: slReport.description,
      sleepReportImage: slReport.photo,
    })),
    mealReports: mealReports?.map((mealReport) => ({
      mealReportId: mealReport.meal_report_id,
      mealReportTime: mealReport.time,
      mealType: mealReport.meal_type,
      quantity: mealReport.quantity,
      mealReportDescription: mealReport.description,
      mealReportImage: mealReport.photo,
    })),
  };
};
