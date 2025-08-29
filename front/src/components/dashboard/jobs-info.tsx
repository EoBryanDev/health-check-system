import { Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { IJobStats } from "@/interfaces/IDashboard"

interface IDashboardJobInfoProps {
  jobStats ?: IJobStats
}

const DashboardJobInfo = ({ jobStats }: IDashboardJobInfoProps ) => {
  return (
    <Card className="sm:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2 sm:pb-4">
        <CardTitle className="text-sm font-medium">Jobs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <div className="border rounded-lg p-3 sm:p-4 h-16 sm:h-20 flex items-center justify-center bg-muted/20">
          <div className="text-center">
            <Activity className="h-4 w-4 sm:h-6 sm:w-6 mx-auto mb-1" />
            <span className="text-xs text-muted-foreground">ACTIVE JOBS</span>
            <div className="text-base sm:text-lg font-bold text-blue-600">{jobStats?.activeJobs ?? 0}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { DashboardJobInfo }