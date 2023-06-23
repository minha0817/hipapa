import { getDaycare } from "@/api/getDaycare";

export default async function Home() {

  const daycare = await getDaycare();

  return (
    <div>
      <h1>Welcome to HIPAPA</h1>
    </div>
  );
}
