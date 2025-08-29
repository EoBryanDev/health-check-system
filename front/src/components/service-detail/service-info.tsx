import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IServiceOutputDTO } from "@/interfaces/IServiceList";

interface ServiceInfoProps {
    service: IServiceOutputDTO;
}

export function ServiceInfo({ service }: ServiceInfoProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Service Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <p className="text-xs text-muted-foreground">Service ID</p>
                        <p className="text-sm font-mono">{service.service_id}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">URL</p>
                        <p className="text-sm text-blue-600">{service.service_url}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Description</p>
                        <p className="text-sm">{service.service_description || "N/A"}</p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <p className="text-xs text-muted-foreground">Group ID</p>
                        <p className="text-sm font-mono">{service.group_id}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Job ID</p>
                        <p className="text-sm font-mono">{service.job_id || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Rate Limit</p>
                        <p className="text-sm">{service.rate_limit_tolerance}</p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <p className="text-xs text-muted-foreground">Last Run</p>
                        <p className="text-sm">
                            {service.last_run ? new Date(service.last_run).toLocaleString() : "Never"}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Created By</p>
                        <p className="text-sm">{service.created_by}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Created At</p>
                        <p className="text-sm">{new Date(service.created_at).toLocaleString()}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}