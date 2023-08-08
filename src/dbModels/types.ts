export type Daycare = {
  id: string;
  created_at: string;
  name: string;
  phone_number: string;
  address: string;
  is_active: boolean
}

export type Teacher = {
  id: string;
  phone_number: string;
  email: string;
  // is_active: boolean;
  daycare_id: string;
  // birthday: string;
  name: string;
}

export type Child = {
  id: string;
  name: string;
  is_active: boolean;
  allergy: string;
  daycare_id: string;
  birthday: string;
  enrolled_day: string;
  parent_id: string;
}