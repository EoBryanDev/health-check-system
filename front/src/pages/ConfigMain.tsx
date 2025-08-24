"use client"

import { LoadingState } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGroupsQuery } from "@/hooks/queries/use-group-data";
import { useJobsQuery } from "@/hooks/queries/use-job-data";
import { useServicesQuery } from "@/hooks/queries/use-service-data";
import { IGroup, IJob, IService } from "@/interfaces/IConfigurations";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { GroupsForm } from "@/components/group-form";
import { JobsForm } from "@/components/job-form";
import { ServicesForm } from "@/components/service-form";

export default function ConfigMain() {
  const [activeSection, setActiveSection] = useState("Groups");

  const { data: groupsData, isLoading: groupIsLoading } = useGroupsQuery();
  const { data: jobsData, isLoading: jobIsLoading } = useJobsQuery();
  const { data: servicesData, isLoading: serviceIsLoading } = useServicesQuery();

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

  const getCurrentData = () => {
    switch (activeSection) {
      case "Groups":
        return groupsData;
      case "Jobs":
        return jobsData;
      case "Services":
        return servicesData;
      default:
        return [];
    }
  };

  const getTableColumns = () => {
    switch (activeSection) {
      case "Groups":
        return ["name", "user", "action"];
      case "Jobs":
        return ["name", "group", "request_limit", "action"];
      case "Services":
        return ["name", "url", "action"];
      default:
        return [];
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
          <Card>
            <CardHeader>
              <CardTitle>{activeSection}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Renderiza o formulário apropriado */}
              {renderForm()}

              {/* Tabela de Dados */}
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        {getTableColumns().map((column) => (
                          <th key={column} className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {getCurrentData()?.map((item: any) => (
                        <tr key={item.id} className="hover:bg-muted/50">
                          <td className="px-4 py-3 text-sm">{item.name}</td>
                          <td className="px-4 py-3 text-sm">
                            {activeSection === "Groups" && (item as IGroup).user}
                            {activeSection === "Jobs" && (item as IJob).group}
                            {activeSection === "Services" && (item as IService).url}
                          </td>
                          {activeSection === "Jobs" && <td className="px-4 py-3 text-sm">1000mb</td>}
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-transparent">
                                <Plus className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-8 h-8 p-0 bg-transparent"
                                disabled={true}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}