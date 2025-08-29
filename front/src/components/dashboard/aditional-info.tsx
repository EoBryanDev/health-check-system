import { IDashboardStats } from "@/interfaces/IDashboard"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface IDashboardAdditionalInfoProps {
  dashboardStats ?: IDashboardStats
}

const DashboardAdditionalInfo = ({dashboardStats}: IDashboardAdditionalInfoProps) => {
  return (
    <Card className="sm:col-span-2 lg:col-span-1">
      <CardHeader className="pb-2 sm:pb-4">
        <CardTitle className="text-sm font-medium">Others</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3">
          {/* <div className="border rounded-lg p-2 sm:p-3 text-center hover:bg-muted/20 transition-colors">
            <div className="text-xs text-muted-foreground">SYSTEM UPTIME</div>
            <div className="text-sm sm:text-lg font-semibold text-green-500">
              {dashboardStats?.systemUptime ?? "N/A"}
            </div>
          </div>
          <div className="border rounded-lg p-2 sm:p-3 text-center hover:bg-muted/20 transition-colors">
            <div className="text-xs text-muted-foreground">AVG SERVICE INTERVAL</div>
            <div className="text-sm sm:text-lg font-semibold">
              {dashboardStats?.averageServiceInterval ?? "N/A"}
            </div>
          </div> */}
          <div className="border rounded-lg p-2 sm:p-3 text-center hover:bg-muted/20 transition-colors">
            <div className="text-xs text-muted-foreground">SERVICES CREATED</div>
            <div className="text-sm sm:text-lg font-semibold">
              {dashboardStats?.servicesCreated?.toLocaleString() ?? 0}
            </div>
          </div>
          <div className="border rounded-lg p-2 sm:p-3 text-center hover:bg-muted/20 transition-colors">
            <div className="text-xs text-muted-foreground">SERVICES ACTIVE</div>
            <div className="text-sm sm:text-lg font-semibold">
              {dashboardStats?.servicesActiveCreated?.toLocaleString() ?? 0}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { DashboardAdditionalInfo }