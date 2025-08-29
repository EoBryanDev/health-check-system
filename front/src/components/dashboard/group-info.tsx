import { UserCheck, Users } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { IGroupStats } from "@/interfaces/IDashboard"

interface IDashboardGroupInfoProps {
  groupStats ?: IGroupStats
}

const DashboardGroupInfo = ({ groupStats } : IDashboardGroupInfoProps) => {
  return (
    <Card className="sm:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2 sm:pb-4">
        <CardTitle className="text-sm font-medium">Groups</CardTitle>
        <Badge variant="secondary" className="text-xs">
          {groupStats?.totalGroups ?? 0} groups
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
            <span className="text-xs font-semibold text-blue-600">{groupStats?.totalGroups ?? 0}</span>
          </Button>
          <Button
            variant="outline"
            className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2 bg-transparent hover:bg-muted/50"
          >
            <UserCheck className="h-4 w-4 sm:h-6 sm:w-6" />
            <span className="text-xs">USERS</span>
            <span className="text-xs font-semibold text-green-600">{groupStats?.totalUsers ?? 0}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export { DashboardGroupInfo } 