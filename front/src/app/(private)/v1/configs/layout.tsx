
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HCS - Configurations",
  description: "Page to make configurations",
};

export default function ConfigLayout({
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
