import { IServiceLogOutputDTO } from "@/interfaces/IServiceList";


export const sortLogs = (
    logs: IServiceLogOutputDTO[],
    sortField: keyof IServiceLogOutputDTO,
    sortDirection: "asc" | "desc"
): IServiceLogOutputDTO[] => {
    if (!logs) return [];

    const sortableLogs = [...logs];
    sortableLogs.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return sortDirection === "asc" ? 1 : -1;
        if (bValue == null) return sortDirection === "asc" ? -1 : 1;

        if (sortField === "start_at") {
            const dateA = new Date(aValue as string).getTime();
            const dateB = new Date(bValue as string).getTime();
            if (dateA < dateB) return sortDirection === "asc" ? -1 : 1;
            if (dateA > dateB) return sortDirection === "asc" ? 1 : -1;
            return 0;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }

        return 0;
    });
    return sortableLogs;
};

export const getStatusBadgeVariant = (classification: string) => {
    switch (classification) {
        case "success": return "default" as const;
        case "warning": return "secondary" as const;
        case "error": return "destructive" as const;
        default: return "outline" as const;
    }
};

export const getStatusCodeColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return "text-green-600";
    if (statusCode >= 300 && statusCode < 400) return "text-blue-600";
    if (statusCode >= 400 && statusCode < 500) return "text-yellow-600";
    if (statusCode >= 500) return "text-red-600";
    return "text-gray-600";
};