
import { Footer } from "@/components/footer";
import { MenuHeader } from "@/components/menu-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HCS - Dashboard",
  description: "Main page to follow up yout services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
       <MenuHeader />
            {children}
        <Footer />
    </div>
  );
}
