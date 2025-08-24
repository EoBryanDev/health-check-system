"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Info } from "lucide-react"

interface JobData {
  name: string
  job: string
  priority: string
  created_at: string
  schedule: string
  last_run: string
  status: "running" | "completed" | "failed" | "scheduled"
}

export function JobCCSection() {
  const [selectedJob, setSelectedJob] = useState("")
  const [priority, setPriority] = useState("")

  const availableJobs = [
    { id: "daily-backup", name: "Daily Backup" },
    { id: "data-sync", name: "Data Sync" },
    { id: "cleanup-job", name: "Cleanup Job" },
    { id: "report-generation", name: "Report Generation" },
  ]

  const [jobData] = useState<JobData[]>([
    {
      name: "backup-job",
      job: "daily-backup",
      priority: "high",
      created_at: "2024-01-15",
      schedule: "0 2 * * *",
      last_run: "2024-01-20 02:00",
      status: "completed",
    },
    {
      name: "sync-job",
      job: "data-sync",
      priority: "medium",
      created_at: "2024-01-16",
      schedule: "*/30 * * * *",
      last_run: "2024-01-20 11:30",
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
      case "scheduled":
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
              <Label htmlFor="job">Job Name</Label>
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a job" />
                </SelectTrigger>
                <SelectContent>
                  {availableJobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full sm:w-auto">
              <Play className="w-4 h-4 mr-2" />
              Run Job
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
          <CardTitle>Job Execution Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Name</th>
                  <th className="text-left p-2 font-medium">Job</th>
                  <th className="text-left p-2 font-medium">Priority</th>
                  <th className="text-left p-2 font-medium hidden sm:table-cell">Created At</th>
                  <th className="text-left p-2 font-medium hidden md:table-cell">Schedule</th>
                  <th className="text-left p-2 font-medium hidden lg:table-cell">Last Run</th>
                  <th className="text-left p-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {jobData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.job}</td>
                    <td className="p-2">
                      <Badge
                        variant={
                          item.priority === "high"
                            ? "destructive"
                            : item.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {item.priority}
                      </Badge>
                    </td>
                    <td className="p-2 hidden sm:table-cell">{item.created_at}</td>
                    <td className="p-2 hidden md:table-cell text-sm text-muted-foreground">{item.schedule}</td>
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
