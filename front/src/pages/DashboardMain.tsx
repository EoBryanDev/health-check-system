"use client"
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useDashboardData } from "@/hooks/queries/use-dashboard-data"; 
import { VolumetryChart } from "@/components/dashboard/volumetry-chart";
import { DashboardFetchError } from "@/components/dashboard/fetch-error";
import { DashboardFetchLoading } from "@/components/dashboard/fetching-data";
import { DashboardGroupInfo } from "@/components/dashboard/group-info";
import { DashboardJobInfo } from "@/components/dashboard/jobs-info";
import { DashboardAdditionalInfo } from "@/components/dashboard/aditional-info";
import { DashboardVolumetryInfo } from "@/components/dashboard/volumetry-info";

export function DashboardMain() {
  const { dashboardStats, jobStats, groupStats, volumetryData, loading, error } = useDashboardData();

  if (loading) {
    return <DashboardFetchLoading />;
  }

  if (error) {
    return (
      <DashboardFetchError error={error} />
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        
        <DashboardGroupInfo groupStats={groupStats} />

        <DashboardJobInfo jobStats={jobStats} />

        <DashboardAdditionalInfo dashboardStats={dashboardStats} />
      </div>

      <DashboardVolumetryInfo loading={loading} volumetryData={volumetryData} />
      
    </div>
  );
}
