"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/loading";
import { ArrowLeft } from 'lucide-react';
import { IServiceLogOutputDTO } from "@/interfaces/IServiceList";
import { sortLogs } from "@/utils/sort-logs";
import { ServiceInfo } from "@/components/service-detail/service-info";
import { ServiceLogsTable } from "@/components/service-detail/service-log-table";
import { useServiceLogsQuery } from "@/hooks/queries/use-service-logs-data";
import { useServicesQuery } from "@/hooks/queries/use-service-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ServiceListDetailMain() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params!.service_id as string;
  const [classificationFilter, setClassificationFilter] = useState("all");
  const [page, setPage] = useState(0);
  const limit = 10;
  const offset = page * limit;

  const { data: service, isLoading: serviceLoading } = useServicesQuery();
  
  const { data: logsResponse, isLoading: logsLoading } = useServiceLogsQuery(serviceId, offset ,limit);

  const [sortField, setSortField] = useState<keyof IServiceLogOutputDTO>("start_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const isLoading = serviceLoading || logsLoading;

  const service_filtered = service?.find(serv => serv.service_id === serviceId);

    
  const logs = logsResponse?.data || [];

  const handleSort = (field: keyof IServiceLogOutputDTO) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedLogs = useMemo(() => {
    const filteredLogs = logs.filter(log => {
      if (classificationFilter === "all") {
        return true;
      }
      return log.classification === classificationFilter;
    });
    
    return sortLogs(filteredLogs, sortField, sortDirection);
  }, [logs, sortField, sortDirection, classificationFilter]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!service_filtered) {
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
            <h1 className="text-2xl md:text-3xl font-bold">{service_filtered.service_name}</h1>
            <p className="text-muted-foreground mt-1">Service details and execution logs</p>
          </div>
        </div>
      </div>

      <ServiceInfo service={service_filtered} />
      
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Classificação</label>
          <Select value={classificationFilter} onValueChange={setClassificationFilter}>
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Todas as classificações" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as classificações</SelectItem>
              <SelectItem value="GOOD">GOOD</SelectItem>
              <SelectItem value="WARNING">WARNING</SelectItem>
              <SelectItem value="ERROR">ERROR</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <ServiceLogsTable logs={sortedLogs} sortField={sortField} onSort={handleSort} />

      <div className="flex justify-between items-center mt-4">
        <Button 
          onClick={() => setPage(prev => Math.max(prev - 1, 0))} 
          disabled={page === 0 || logsLoading}
        >
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">Página {page + 1}</span>
        <Button 
          onClick={() => setPage(prev => prev + 1)}
          disabled={logsLoading || (logsResponse?.data?.length ?? 0) < limit}
        >
          Próximo
        </Button>
      </div>
    </main>
  );
}