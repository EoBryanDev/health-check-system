"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Info } from "lucide-react"

interface GroupData {
  name: string
  group: string
  method: string
  created_at: string
  call: string
  last_run: string
  status: "running" | "completed" | "failed" | "pending"
}

export function GroupCCSection() {
  const [selectedGroup, setSelectedGroup] = useState("")
  const [servicesCount, setServicesCount] = useState("5")

  const availableGroups = [
    { id: "group1", name: "Group 1" },
    { id: "group2", name: "Group 2" },
    { id: "group3", name: "Group 3" },
  ]

  const [groupData] = useState<GroupData[]>([
    {
      name: "service1",
      group: "group1",
      method: "job1",
      created_at: "2024-01-15",
      call: "api/v1/service1",
      last_run: "2024-01-20 10:30",
      status: "completed",
    },
    {
      name: "service2",
      group: "group1",
      method: "job1",
      created_at: "2024-01-16",
      call: "api/v1/service2",
      last_run: "2024-01-20 11:15",
      status: "running",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      case "failed":
        return "bg-red-500"
      case "pending":
        return "bg-yellow-500"
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
              <Label htmlFor="group">Group</Label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a group" />
                </SelectTrigger>
                <SelectContent>
                  {availableGroups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="services-count">Services Count</Label>
              <Input
                id="services-count"
                value={servicesCount}
                onChange={(e) => setServicesCount(e.target.value)}
                placeholder="5"
              />
            </div>

            <Button className="w-full sm:w-auto">
              <Play className="w-4 h-4 mr-2" />
              Run Group
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
          <CardTitle>Group Execution Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Name</th>
                  <th className="text-left p-2 font-medium">Group</th>
                  <th className="text-left p-2 font-medium">Method</th>
                  <th className="text-left p-2 font-medium hidden sm:table-cell">Created At</th>
                  <th className="text-left p-2 font-medium hidden md:table-cell">Call</th>
                  <th className="text-left p-2 font-medium hidden lg:table-cell">Last Run</th>
                  <th className="text-left p-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {groupData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.group}</td>
                    <td className="p-2">{item.method}</td>
                    <td className="p-2 hidden sm:table-cell">{item.created_at}</td>
                    <td className="p-2 hidden md:table-cell text-sm text-muted-foreground">{item.call}</td>
                    <td className="p-2 hidden lg:table-cell text-sm">{item.last_run}</td>
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
