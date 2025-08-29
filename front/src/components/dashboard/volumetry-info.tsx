import { IVolumetryData } from "@/interfaces/IDashboard"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { VolumetryChart } from "./volumetry-chart"

interface IDashboardVolumetryInfo {
  volumetryData: IVolumetryData[] | undefined,
  loading: boolean
}

const DashboardVolumetryInfo = ({volumetryData, loading} : IDashboardVolumetryInfo) => {
  return (
    <Card className="sm:col-span-full">
        <CardHeader className="pb-2 sm:pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">24H VOLUMETRY</CardTitle>
            
          </div>
        </CardHeader>
        <CardContent>
          <VolumetryChart 
            data={volumetryData || []} 
            loading={loading}
          />
        </CardContent>
      </Card>
  )
}

export { DashboardVolumetryInfo }