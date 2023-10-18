import { Database } from "@/supabase.types";
import { getCurrentUser } from "@/utils/supabaseHelper.utils";
import { SupabaseClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";
import { NextResponse } from "next/server";

export const getChild = async (supabase: SupabaseClient<Database>) => {
  const user = await getCurrentUser(supabase);

  if (!user)
    throw NextResponse.json("User Not Found", {
      status: 404,
      statusText: "Not Found",
    });

  const { data, error, status, statusText } = await supabase
    .from("children")
    .select()
    .eq("parent_id", user.id)
    .single();

  if (error) throw NextResponse.json(error, { status, statusText });

  const { data: checkInData } = await supabase
    .from("check_in")
    .select()
    .eq("child_id", data.child_id)
    .gte(
      "check_in_out_time",
      DateTime.now().setZone("America/Vancouver").startOf("day").toISO()
    )
    .maybeSingle();

  const childData = {
    childId: data.child_id,
    daycareId: data.daycare_id,
    parentId: data.parent_id,
    childName: data.name,
    isActive: data.is_active,
    checkIn: checkInData,
  };

  return childData;
};
