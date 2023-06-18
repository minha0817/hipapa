import { generateChildData } from "@/lib/faker";
import { supabase } from "@/lib/supabaseClient";


export default async function Home() {

  const child = generateChildData();

  const { data, error } = await supabase
  .from('child')
  .insert(child);

  if (error) {
    console.error('Error adding user:', error.message);
  } else {
    console.log('User added successfully:', child);
  }


  return <div>Welcome to Hipapa</div>;
};
