"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown } from 'lucide-react'
import { sortServices } from "@/utils/service-utils"
import { IServiceOutputDTO } from "@/interfaces/IService"
import { useServicesQuery } from "@/hooks/queries/use-service-data"
import { Badge } from "@/components/ui/badge"
import { useGroupsQuery } from "@/hooks/queries/use-group-data"
import { formatWithTimeZone } from "@/helpers/formatWTimeZone"

const getServiceStatus = (service: IServiceOutputDTO): 'online' | 'error' | 'offline' => {
  if (!service.last_run) {
    return 'offline';
  }
  return 'online';
};

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "online":
            return "success";
        case "error":
        case "offline":
            return "destructive";
        default:
            return "secondary";
    }
};

export function ServiceListMain() {
    const router = useRouter()
    const [sortField, setSortField] = useState<keyof IServiceOutputDTO>("last_run")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
    const [groupFilter, setGroupFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")

    const { data: servicesData, isLoading: isLoadingServices, isError: isErrorServices } = useServicesQuery();
    const { data: groupsData, isLoading: isLoadingGroups } = useGroupsQuery();

    const servicesWithStatus = useMemo(() => {
        if (!servicesData) return [];
        return servicesData.map(service => ({
            ...service,
            status: getServiceStatus(service)
        }));
    }, [servicesData]);

    const uniqueGroups = useMemo(() => {
        if (!groupsData) return [];
        return groupsData.map(group => group.group_id);
    }, [groupsData]);

    const statusCounts = useMemo(() => {
        const counts = { online: 0, error: 0, offline: 0 };
        if (servicesWithStatus) {
            servicesWithStatus.forEach(service => {
                const statusKey = service.status as keyof typeof counts;
                if (statusKey in counts) {
                    counts[statusKey]++;
                } else if (service.status === 'error') {
                     counts.error++;
                }
            });
        }
        return counts;
    }, [servicesWithStatus]);

    const handleSort = (field: keyof IServiceOutputDTO) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("desc")
        }
    }

    const filteredAndSortedServices = useMemo(() => {
        if (!servicesWithStatus) return [];
        
        const filtered = servicesWithStatus.filter((service) => {
            const matchesGroup = groupFilter === "all" || service.group_id === groupFilter;
            const matchesStatus = statusFilter === "all" || service.status === statusFilter;
            return matchesGroup && matchesStatus;
        });
        
        return sortServices(filtered, sortField, sortDirection);
    }, [servicesWithStatus, groupFilter, statusFilter, sortField, sortDirection]);

    const handleServiceClick = (serviceId: string) => {
        router.push(`/v1/services/${serviceId}`)
    }
    
    if (isLoadingServices || isLoadingGroups) {
      return (
          <div className="flex justify-center items-center h-64">
              <p>Loading services...</p>
          </div>
      );
    }
    
    if (isErrorServices) {
      return (
          <div className="flex justify-center items-center h-64 text-red-500">
              <p>Error fetching services. Please try again later.</p>
          </div>
      );
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
                                        {uniqueGroups.map(group => (
                                            <SelectItem key={group} value={group}>{group}</SelectItem>
                                        ))}
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
                                        <SelectItem value="error">Error</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-green-600 mb-1">Online</p>
                                    <p className="text-2xl font-bold">{statusCounts.online}</p>
                                </div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
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
                                        { key: "service_name", label: "Name" },
                                        { key: "service_url", label: "URL" },
                                        { key: "group_id", label: "Group" },
                                        { key: "last_run", label: "Last Run" },
                                        { key: "rate_limit_tolerance", label: "Rate Limit" }
                                    ].map((column) => (
                                        <th
                                            key={column.key}
                                            className="text-left p-3 font-medium text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                                            onClick={() => handleSort(column.key as keyof IServiceOutputDTO)}
                                        >
                                            <div className="flex items-center gap-1">
                                                {column.label}
                                                {sortField === column.key && (
                                                    <ArrowUpDown
                                                        className={`w-3 h-3 transition-transform ${
                                                            sortDirection === "asc" ? "rotate-180" : ""
                                                        }`}
                                                    />
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAndSortedServices.map((service) => (
                                    <tr
                                        key={service.service_id}
                                        className="border-b hover:bg-muted/50 cursor-pointer transition-colors"
                                        onClick={() => handleServiceClick(service.service_id)}
                                    >
                                        <td className="p-3 text-sm font-medium">{service.service_name}</td>
                                        <td className="p-3 text-sm text-blue-600 truncate max-w-xs">{service.service_url}</td>
                                        <td className="p-3 text-sm">{service.group_id}</td>
                                        <td className="p-3 text-sm">
                                            {service.last_run ? formatWithTimeZone(service.last_run) : "Never"}
                                        </td>
                                        <td className="p-3 text-sm">{service.rate_limit_tolerance}</td>
                                     
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