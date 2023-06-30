import { AdminNavbar } from "@/components/adminNavbar/adminNavbar.component";

export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminNavbar />
      <main>{children}</main>
    </>
  );
}