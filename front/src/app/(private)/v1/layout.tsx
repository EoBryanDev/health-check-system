
import { Footer } from "@/components/footer";
import { Menu } from "@/components/menu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HC - Dashboard",
  description: "Main page to follow up yout services",
};

export default function LoggedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="min-h-screen bg-background flex flex-col">
       <Menu />
          {children}
        <Footer />
    </div>
  );
}
