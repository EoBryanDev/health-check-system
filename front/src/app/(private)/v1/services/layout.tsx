
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HCS - Monitoration",
  description: "Page follow snets",
};

export default function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="min-h-screen bg-background flex flex-col">
        {children}
    </div>
  );
}
