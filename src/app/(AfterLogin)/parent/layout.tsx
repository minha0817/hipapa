import { ParentNavbar } from "@/components/navbar/parentNavbar/parentNavbar.component";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ParentNavbar />
      <main>{children}</main>
    </>
  );
}