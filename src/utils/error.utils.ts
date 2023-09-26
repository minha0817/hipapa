import { PostgrestError } from "@supabase/supabase-js";

export class SupabasePostgresError extends Error {
  constructor(
    public error: PostgrestError,
    public status: number,
    public statusText: string,
  ) {
    super(error.message);
  }
}

export class ServiceError extends Error {
  constructor(
    public statusCode: number = 500,
    public message: string = "Unknown Error",
    public statusText?: string,
  ) {
    super(message);
  }
}

export class ResourceNotFoundException extends ServiceError {
  constructor(public message: string = "Resource Not Found") {
    super(404, message, "Resource Not Found");
  }
}
