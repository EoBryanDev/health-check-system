"use client";

import { GroupsForm } from "@/components/group-form";
import { JobsForm } from "@/components/job-form";
import { LoadingState } from "@/components/loading";
import { ServicesForm } from "@/components/service-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGroupsQuery } from "@/hooks/queries/use-group-data";
import { useJobsQuery } from "@/hooks/queries/use-job-data";
import { useServicesQuery } from "@/hooks/queries/use-service-data";
import { useState } from "react";

export default function ConfigMain() {
  const [activeSection, setActiveSection] = useState("Groups");

  const { isLoading: groupIsLoading } = useGroupsQuery();
  const { isLoading: jobIsLoading } = useJobsQuery();
  const { isLoading: serviceIsLoading } = useServicesQuery();

  const renderForm = () => {
    switch (activeSection) {
      case "Groups":
        return <GroupsForm />;
      case "Jobs":
        return <JobsForm />;
      case "Services":
        return <ServicesForm />;
      default:
        return null;
    }
  };

  const isLoading = groupIsLoading || jobIsLoading || serviceIsLoading;

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Configurations</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-64">
          <Card>
            <CardHeader>
              <CardTitle>General</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {["Groups", "Jobs", "Services"].map((section) => (
                  <Button
                    key={section}
                    variant={activeSection === section ? "secondary" : "ghost"}
                    className="w-full justify-start rounded-none"
                    onClick={() => setActiveSection(section)}
                  >
                    {section}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Section Selector */}
        <div className="lg:hidden">
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {["Groups", "Jobs", "Services"].map((section) => (
              <Button
                key={section}
                variant={activeSection === section ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveSection(section)}
                className="whitespace-nowrap"
              >
                {section}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {renderForm()}
        </div>
      </div>
    </div>
  );
}