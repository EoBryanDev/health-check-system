"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Info } from "lucide-react"
import { useServicesQuery } from "@/hooks/queries/use-service-data"
import { LoadingState } from "./loading"
import { useRunServiceMutation } from "@/hooks/mutations/use-run-service"
import { toast } from "sonner"

export function ServiceCCSection() {
  const [selectedService, setSelectedService] = useState("");
  const runJob = useRunServiceMutation()
  const [endpoint, setEndpoint] = useState("");
  const { data: servicesData, isLoading} = useServicesQuery();

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId)
    const service = servicesData?.find((s) => s.service_id === serviceId)
    if (service) {
      setEndpoint(service.service_url)
    }
  }

  const filteredServices = servicesData?.filter(service => {
    if (selectedService === "") {
      return true; 
    }
    return service.service_id === selectedService;
  }) || [];

  if (isLoading) {
    return <LoadingState />
  }

  const handleOnClick = async () => {
    console.log('here');
    
    try {
      await runJob.mutateAsync(selectedService)
      
      toast.success("JobRunned!");
      
    } catch (error) {
      toast.error("There was not possible run job");
      console.error(error);
    }
  }

  return (
    <div className="space-y-6">
    <Card>
      <CardContent className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
        <Label htmlFor="service">Service Name</Label>
        <Select value={selectedService} onValueChange={handleServiceChange}>
          <SelectTrigger>
          <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
          {servicesData?.map((service) => (
            <SelectItem key={service.service_id} value={service.service_id}>
            {service.service_name}
            </SelectItem>
          ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="endpoint">Endpoint</Label>
        <Input
          disabled
          id="endpoint"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          placeholder="/api/v1/service"
        />
      </div>

        <Button className="w-full cursor-pointer sm:w-auto" onClick={handleOnClick}>
        <Play className="w-4 h-4 mr-2" />
        Run Service
        </Button>

        <Button variant="outline" className="w-full sm:w-auto bg-transparent">
        <Info className="w-4 h-4 mr-2" />
        Details
        </Button>
      </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
      <CardTitle>Service Execution Results</CardTitle>
      </CardHeader>
      <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
          <th className="text-left p-2 font-medium">Name</th>
          <th className="text-left p-2 font-medium">Endpoint</th>
          <th className="text-left p-2 font-medium hidden sm:table-cell">Created At</th>
          <th className="text-left p-2 font-medium hidden lg:table-cell">Last Check</th>
          <th className="text-left p-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((item, index) => (
          <tr key={index} className="border-b hover:bg-muted/50">
            <td className="p-2">{item.service_name}</td>
            <td className="p-2 text-sm text-muted-foreground">{item.service_url}</td>
            <td className="p-2 hidden sm:table-cell">{item.created_at}</td>
            <td className="p-2 hidden lg:table-cell text-sm">{item.last_run}</td>
            <td className="px-4 py-3 text-sm">
              {<Badge className={`${item.active ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
              {item.active ? 'active' : 'inactive'}
            </Badge>}
           </td>
          </tr>
          ))}
        </tbody>
        </table>
      </div>
      </CardContent>
    </Card>
    </div>
  )
}