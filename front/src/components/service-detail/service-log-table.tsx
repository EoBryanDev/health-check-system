import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from 'lucide-react';
import { IServiceLogOutputDTO } from "@/interfaces/IServiceList";
import { getStatusBadgeVariant, getStatusCodeColor } from "@/utils/sort-logs";

interface ServiceLogsTableProps {
    logs: IServiceLogOutputDTO[];
    sortField: keyof IServiceLogOutputDTO;
    onSort: (field: keyof IServiceLogOutputDTO) => void;
}

export function ServiceLogsTable({ logs, sortField, onSort }: ServiceLogsTableProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Execution Logs</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b bg-muted/50">
                            <tr>
                                {[
                                    { key: "service_log_id", label: "Log ID" },
                                    { key: "start_at", label: "Start Time" },
                                    { key: "duration", label: "Duration (ms)" },
                                    { key: "method", label: "Method" },
                                    { key: "status_code", label: "Status Code" },
                                    { key: "requester", label: "Requester" },
                                    { key: "device", label: "Device" },
                                    { key: "classification", label: "Classification" },
                                ].map((column) => (
                                    <th
                                        key={column.key}
                                        className="text-left p-3 font-medium text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                                        onClick={() => onSort(column.key as keyof IServiceLogOutputDTO)}
                                    >
                                        <div className="flex items-center gap-1">
                                            {column.label}
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length > 0 ? (
                                logs.map((log) => (
                                    <tr key={log.service_log_id} className="border-b hover:bg-muted/50 transition-colors">
                                        <td className="p-3 text-sm font-mono">{log.service_log_id}</td>
                                        <td className="p-3 text-sm">{new Date(log.start_at).toLocaleString()}</td>
                                        <td className="p-3 text-sm">{log.duration.toLocaleString()}</td>
                                        <td className="p-3 text-sm">
                                            <Badge variant="outline">{log.method}</Badge>
                                        </td>
                                        <td className="p-3 text-sm">
                                            <span className={getStatusCodeColor(log.status_code)}>{log.status_code}</span>
                                        </td>
                                        <td className="p-3 text-sm">{log.requester}</td>
                                        <td className="p-3 text-sm">{log.device}</td>
                                        <td className="p-3">
                                            <Badge variant={getStatusBadgeVariant(log.classification)}>{log.classification}</Badge>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="text-center py-8 text-muted-foreground">
                                        No logs found for this service.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}