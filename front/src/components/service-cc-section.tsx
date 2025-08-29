"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Info } from "lucide-react"

interface ServiceData {
  name: string
  service: string
  endpoint: string
  created_at: string
  health: string
  last_check: string
  status: "online" | "offline" | "maintenance" | "error"
}

export function ServiceCCSection() {
  const [selectedService, setSelectedService] = useState("")
  const [endpoint, setEndpoint] = useState("")

  const availableServices = [
    { id: "user-api", name: "User API", endpoint: "/api/v1/users" },
    { id: "authentication", name: "Authentication Service", endpoint: "/api/v1/auth" },
    { id: "payment-service", name: "Payment Service", endpoint: "/api/v1/payments" },
    { id: "notification-service", name: "Notification Service", endpoint: "/api/v1/notifications" },
  ]

  const [serviceData] = useState<ServiceData[]>([
    {
      name: "api-service",
      service: "user-api",
      endpoint: "/api/v1/users",
      created_at: "2024-01-15",
      health: "99.9%",
      last_check: "2024-01-20 11:45",
      status: "online",
    },
    {
      name: "auth-service",
      service: "authentication",
      endpoint: "/api/v1/auth",
      created_at: "2024-01-16",
      health: "98.5%",
      last_check: "2024-01-20 11:44",
      status: "maintenance",
    },
  ])

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId)
    const service = availableServices.find((s) => s.id === serviceId)
    if (service) {
      setEndpoint(service.endpoint)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "offline":
        return "bg-red-500"
      case "maintenance":
        return "bg-yellow-500"
      case "error":
        return "bg-red-600"
      default:
        return "bg-gray-500"
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
                  {availableServices.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endpoint">Endpoint</Label>
              <Input
                id="endpoint"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder="/api/v1/service"
              />
            </div>

            <Button className="w-full sm:w-auto">
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
                  <th className="text-left p-2 font-medium">Service</th>
                  <th className="text-left p-2 font-medium">Endpoint</th>
                  <th className="text-left p-2 font-medium hidden sm:table-cell">Created At</th>
                  <th className="text-left p-2 font-medium hidden md:table-cell">Health</th>
                  <th className="text-left p-2 font-medium hidden lg:table-cell">Last Check</th>
                  <th className="text-left p-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {serviceData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.service}</td>
                    <td className="p-2 text-sm text-muted-foreground">{item.endpoint}</td>
                    <td className="p-2 hidden sm:table-cell">{item.created_at}</td>
                    <td className="p-2 hidden md:table-cell text-sm">{item.health}</td>
                    <td className="p-2 hidden lg:table-cell text-sm">{item.last_check}</td>
                    <td className="p-2">
                      <Badge className={`${getStatusColor(item.status)} text-white`}>{item.status}</Badge>
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
