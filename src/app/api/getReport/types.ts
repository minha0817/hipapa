import { Database } from "@/supabase.types";

export type Reports = {
  incidentReports: IncidentReport[];
  activityReports: IncidentReport[];
  sleepReports: SleepReport[];
  mealReports: MealReport[];
};

export type IncidentReport = {
  reportId: string;
  reportTime: string;
  reportDescription: string;
  reportImage: string;
};

export type SleepReport = {
  sleepReportId: string;
  napStart: string;
  napEnd: string;
  sleepReportDescription: string;
  sleepReportImage: string;
};

export type MealReport = {
  mealReportId: string;
  mealReportTime: string;
  mealType: Database["public"]["Enums"]["meal_type"];
  quantity: Database["public"]["Enums"]["quantity"];
  mealReportDescription: string;
  mealReportImage: string;
};
