import { getDaycare } from "@/api/get";
import Link from "next/link";

export default async function Home() {
  // const daycare = await getDaycare();

  // console.log('daycare', daycare);

  return (
    <div>
      <h1>Welcome to HIPAPA</h1>
      <div>
        <Link href="/login/admin">Login for Admin/Teacher</Link>
      </div>
      <div>
        <Link href="/login/parent">Login for Parents</Link>
      </div>
    </div>
  );
}
