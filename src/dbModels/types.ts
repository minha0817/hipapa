export type Daycare = {
  daycare_id: string;
  created_at: string;
  name: string;
  phone_number: string;
  address: string;
  is_active: boolean
}

export type Teacher = {
  teacher_id: string;
  phone_number: string;
  email: string;
  daycare_id: string;
  name: string;
}

export type Child = {
  child_id: string;
  name: string;
  is_active: boolean;
  allergy: string;
  daycare_id: string;
  birthday: string;
  enrolled_day: string;
  parent_id: string;
}