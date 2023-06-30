import { AdminNavbar } from "@/components/adminNavbar/adminNavbar.component";

export default function AdminLayout({
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