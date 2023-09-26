import { SupabaseClient } from "@supabase/supabase-js";
import { ServiceError } from "./error.utils";

export const getCurrentUser = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.auth.getUser();

  //This causes an error on /auth/sign-in page
  // if (error) throw new ServiceError(error.status, error.message, error.name);
  // if (!data.user) throw new ServiceError(401, "Not Authenticated");
  return data.user;
};