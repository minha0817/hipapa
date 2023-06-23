import "./globals.css";
import { Inter, Amatic_SC } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Hipapa",
  description: "Daycare app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
