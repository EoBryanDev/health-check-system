"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/loading";
import { ArrowLeft } from 'lucide-react';
import { IServiceLogOutputDTO } from "@/interfaces/IServiceList";
import { useServiceLogsQuery } from "@/hooks/queries/use-service-logs-data";
import { sortLogs } from "@/utils/sort-logs";
import { ServiceInfo } from "@/components/service-detail/service-info";
import { ServiceLogsTable } from "@/components/service-detail/service-log-table";
import { useServiceDetailQuery } from "@/hooks/queries/service-logs-data";

export default function ServiceListDetailMain() {
    const params = useParams();
    const router = useRouter();
    const serviceId = params!.service_id as string;

    // Removido o 'refetch' das queries
    const { data: service, isLoading: serviceLoading } = useServiceDetailQuery(serviceId);
    const { data: logs, isLoading: logsLoading } = useServiceLogsQuery(serviceId);

    const [sortField, setSortField] = useState<keyof IServiceLogOutputDTO>("start_at");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

    const isLoading = serviceLoading || logsLoading;

    const handleSort = (field: keyof IServiceLogOutputDTO) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    };

    const sortedLogs = useMemo(() => {
        return sortLogs(logs || [], sortField, sortDirection);
    }, [logs, sortField, sortDirection]);

    // A função 'handleRefresh' foi removida, pois não é mais necessária

    if (isLoading) {
        return <LoadingState />;
    }

    if (!service) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
                <Button onClick={() => router.push("/v1/services")}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Services
                </Button>
            </div>
        );
    }

    return (
        <main className="container mx-auto px-4 py-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => router.push("/v1/services")}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">{service.service_name}</h1>
                        <p className="text-muted-foreground mt-1">Service details and execution logs</p>
                    </div>
                </div>
            </div>

            <ServiceInfo service={service} />

            <ServiceLogsTable logs={sortedLogs} sortField={sortField} onSort={handleSort} />
        </main>
    );
}