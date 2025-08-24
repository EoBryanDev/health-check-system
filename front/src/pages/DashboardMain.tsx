"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Activity, AlertTriangle, CheckCircle, XCircle, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useDashboardData } from "@/hooks/queries/use-dashboard-data";
import { useMediaQuery } from 'react-responsive';
import { LoadingState } from "@/components/loading";

export function DashboardMain() {
  const { dashboardStats, jobStats, groupStats, volumetryData, loading } = useDashboardData();
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });

   if (loading) {
        return <LoadingState />
    }
  const filteredVolumetryData = isSmallScreen 
    ? volumetryData.filter((_, index) => index % 3 === 0) 
    : volumetryData;

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Groups Section */}
        <Card className="sm:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2 sm:pb-4">
            <CardTitle className="text-sm font-medium">Groups</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {groupStats.totalGroups} groups
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <Button
                variant="outline"
                className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2 bg-transparent hover:bg-muted/50"
              >
                <Users className="h-4 w-4 sm:h-6 sm:w-6" />
                <span className="text-xs">GROUPS</span>
                <span className="text-xs font-semibold text-blue-600">{groupStats.totalGroups}</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2 bg-transparent hover:bg-muted/50"
              >
                <UserCheck className="h-4 w-4 sm:h-6 sm:w-6" />
                <span className="text-xs">USERS</span>
                <span className="text-xs font-semibold text-green-600">{groupStats.totalUsers}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Jobs Section */}
        <Card className="sm:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2 sm:pb-4">
            <CardTitle className="text-sm font-medium">Jobs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="border rounded-lg p-3 sm:p-4 h-16 sm:h-20 flex items-center justify-center bg-muted/20">
              <div className="text-center">
                <Activity className="h-4 w-4 sm:h-6 sm:w-6 mx-auto mb-1" />
                <span className="text-xs text-muted-foreground">ACTIVE JOBS</span>
                <div className="text-base sm:text-lg font-bold text-blue-600">{jobStats.activeJobs}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1 sm:gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col items-center space-y-1 bg-transparent h-10 sm:h-12 px-1 sm:px-3"
              >
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span className="text-xs hidden sm:inline">SUCCESS</span>
                  <span className="text-xs sm:hidden">SUC</span>
                </div>
                <span className="text-xs font-semibold text-green-600">{jobStats.successJobs}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col items-center space-y-1 bg-transparent h-10 sm:h-12 px-1 sm:px-3"
              >
                <div className="flex items-center space-x-1">
                  <AlertTriangle className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs hidden sm:inline">WARNING</span>
                  <span className="text-xs sm:hidden">WAR</span>
                </div>
                <span className="text-xs font-semibold text-yellow-600">{jobStats.warningJobs}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col items-center space-y-1 bg-transparent h-10 sm:h-12 px-1 sm:px-3"
              >
                <div className="flex items-center space-x-1">
                  <XCircle className="h-3 w-3 text-red-500" />
                  <span className="text-xs hidden sm:inline">ERROR</span>
                  <span className="text-xs sm:hidden">ERR</span>
                </div>
                <span className="text-xs font-semibold text-red-600">{jobStats.errorJobs}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-sm font-medium">Others</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3">
              <div className="border rounded-lg p-2 sm:p-3 text-center hover:bg-muted/20 transition-colors">
                <div className="text-xs text-muted-foreground">SYSTEM UPTIME</div>
                <div className="text-sm sm:text-lg font-semibold text-green-500">{dashboardStats.systemUptime}</div>
              </div>
              <div className="border rounded-lg p-2 sm:p-3 text-center hover:bg-muted/20 transition-colors">
                <div className="text-xs text-muted-foreground">AVG SERVICE INTERVAL</div>
                <div className="text-sm sm:text-lg font-semibold">{dashboardStats.averageServiceInterval}</div>
              </div>
              <div className="border rounded-lg p-2 sm:p-3 text-center hover:bg-muted/20 transition-colors">
                <div className="text-xs text-muted-foreground">SERVICES CREATED</div>
                <div className="text-sm sm:text-lg font-semibold">
                  {dashboardStats.servicesCreated.toLocaleString()}
                </div>
              </div>
              <div className="border rounded-lg p-2 sm:p-3 text-center hover:bg-muted/20 transition-colors">
                <div className="text-xs text-muted-foreground">SERVICES ACTIVE</div>
                <div className="text-sm sm:text-lg font-semibold">
                  {dashboardStats.servicesActiveCreated.toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="sm:col-span-full">
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="text-sm font-medium text-center">24H VOLUMETRY</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 sm:h-64 border rounded-lg flex items-center justify-center bg-muted/20">
            {volumetryData.length > 0 ? (
              <div className="w-full h-full p-2 sm:p-4">
                <div className="flex items-end justify-between h-full space-x-1">
                  {filteredVolumetryData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className="bg-blue-500 w-full rounded-t"
                        style={{ height: `${(data.volume / 120) * 100}%` }}
                      />
                      <span className="text-xs text-muted-foreground mt-1 text-center">{data.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2" />
                <p className="text-sm">Nenhum dado disponível</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}