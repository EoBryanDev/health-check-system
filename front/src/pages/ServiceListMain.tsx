"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, ArrowUpDown } from 'lucide-react'
import { IServiceOutputDTO } from "@/interfaces/IServiceList"
import { sortServices } from "@/utils/service-utils" 

export function ServiceListMain() {
    const router = useRouter()
    const [sortField, setSortField] = useState<keyof IServiceOutputDTO>("last_run")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
    const [groupFilter, setGroupFilter] = useState("")
    const [statusFilter, setStatusFilter] = useState("")

    const [services] = useState<(IServiceOutputDTO & { status: "online" | "warning" | "error" | "offline" })[]>([
        {
            service_id: "1",
            service_name: "service-1",
            service_url: "http://localhost:3000",
            group_id: "group-id-1",
            job_id: "job-id-1",
            last_run: "2024-01-15T10:30:00Z",
            rate_limit_tolerance: 100,
            service_description: "First sample service",
            created_at: "2024-01-01T00:00:00Z",
            created_by: "admin",
            status: "online",
        },
        {
            service_id: "2",
            service_name: "service-2",
            service_url: "http://localhost:3001",
            group_id: "group-id-2",
            job_id: "job-id-2",
            last_run: "2024-01-15T15:07:51Z",
            rate_limit_tolerance: 200,
            service_description: "Second sample service",
            created_at: "2024-01-01T00:00:00Z",
            created_by: "admin",
            status: "warning",
        },
        {
            service_id: "3",
            service_name: "service-3",
            service_url: "http://localhost:3002",
            group_id: "group-id-1",
            job_id: "job-id-3",
            last_run: null,
            rate_limit_tolerance: 50,
            service_description: "Third sample service",
            created_at: "2024-01-01T00:00:00Z",
            created_by: "admin",
            status: "error",
        },
    ])

    const statusCounts = useMemo(() => ({
      success: services.filter((s) => s.status === "online").length,
      warning: services.filter((s) => s.status === "warning").length,
      error: services.filter((s) => s.status === "error" || s.status === "offline").length,
    }), [services]);

    const handleSort = (field: keyof IServiceOutputDTO) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("desc")
        }
    }

    const filteredAndSortedServices = useMemo(() => {
      const filtered = services.filter((service) => {
        const matchesGroup = groupFilter === "" || groupFilter === "all" || service.group_id === groupFilter;
        const matchesStatus = statusFilter === "" || statusFilter === "all" || service.status === statusFilter;
        return matchesGroup && matchesStatus;
      });
      return sortServices(filtered, sortField, sortDirection);
    }, [services, groupFilter, statusFilter, sortField, sortDirection]);

    const handleServiceClick = (serviceId: string) => {
        router.push(`/v1/services/${serviceId}`)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Service Monitoring</h1>
                    <p className="text-muted-foreground mt-1">Monitor and track service performance and execution status</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-1 space-y-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Filters</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <label className="text-xs font-medium text-muted-foreground mb-1 block">Groups</label>
                                <Select value={groupFilter} onValueChange={setGroupFilter}>
                                    <SelectTrigger className="h-8">
                                        <SelectValue placeholder="All groups" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All groups</SelectItem>
                                        <SelectItem value="group-id-1">Group 1</SelectItem>
                                        <SelectItem value="group-id-2">Group 2</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground mb-1 block">Status</label>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="h-8">
                                        <SelectValue placeholder="All status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All status</SelectItem>
                                        <SelectItem value="online">Online</SelectItem>
                                        <SelectItem value="warning">Warning</SelectItem>
                                        <SelectItem value="error">Error</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button size="sm" className="w-full">
                                <Filter className="w-3 h-3 mr-1" />
                                Filter
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-green-600 mb-1">Success</p>
                                    <p className="text-2xl font-bold">{statusCounts.success}</p>
                                </div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-yellow-600 mb-1">Warning</p>
                                    <p className="text-2xl font-bold">{statusCounts.warning}</p>
                                </div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-red-600 mb-1">Error</p>
                                    <p className="text-2xl font-bold">{statusCounts.error}</p>
                                </div>
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Services</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b bg-muted/50">
                                <tr>
                                    {[
                                        { key: "service_id", label: "Service ID" },
                                        { key: "service_name", label: "Name" },
                                        { key: "service_url", label: "URL" },
                                        { key: "group_id", label: "Group ID" },
                                        { key: "job_id", label: "Job ID" },
                                        { key: "last_run", label: "Last Run" },
                                        { key: "rate_limit_tolerance", label: "Rate Limit" },
                                        { key: "service_description", label: "Description" },
                                    ].map((column) => (
                                        <th
                                            key={column.key}
                                            className="text-left p-3 font-medium text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                                            onClick={() => handleSort(column.key as keyof IServiceOutputDTO)}
                                        >
                                            <div className="flex items-center gap-1">
                                                {column.label}
                                                <ArrowUpDown className="w-3 h-3" />
                                            </div>
                                        </th>
                                    ))}
                                    {/* <th className="text-left p-3 font-medium text-sm">Status</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAndSortedServices.map((service) => (
                                    <tr
                                        key={service.service_id}
                                        className="border-b hover:bg-muted/50 cursor-pointer transition-colors"
                                        onClick={() => handleServiceClick(service.service_id)}
                                    >
                                        <td className="p-3 text-sm">{service.service_id}</td>
                                        <td className="p-3 text-sm font-medium">{service.service_name}</td>
                                        <td className="p-3 text-sm text-blue-600">{service.service_url}</td>
                                        <td className="p-3 text-sm">{service.group_id}</td>
                                        <td className="p-3 text-sm">{service.job_id || "N/A"}</td>
                                        <td className="p-3 text-sm">
                                            {service.last_run ? new Date(service.last_run).toLocaleString() : "Never"}
                                        </td>
                                        <td className="p-3 text-sm">{service.rate_limit_tolerance}</td>
                                        <td className="p-3 text-sm">{service.service_description || "N/A"}</td>
                                        {/* <td className="p-3">
                                            <Badge variant={getStatusBadgeVariant(service.status)}>{service.status}</Badge>
                                        </td> */}
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