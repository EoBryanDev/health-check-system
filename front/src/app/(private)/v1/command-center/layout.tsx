
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HC - Command Center",
  description: "Run your jobs",
};

export default function CommandCenterLayout({
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
