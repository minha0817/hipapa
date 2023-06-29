export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main suppressHydrationWarning={true}>{children}</main>;
}
