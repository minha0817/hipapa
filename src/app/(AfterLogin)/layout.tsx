import { Navbar } from "@/components/navbar/navbar.component";

export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
