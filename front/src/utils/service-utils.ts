import { IServiceOutputDTO } from "@/interfaces/IServiceList";

export const sortServices = (
    services: IServiceOutputDTO[],
    sortField: keyof IServiceOutputDTO,
    sortDirection: "asc" | "desc"
): IServiceOutputDTO[] => {
    if (!services) return [];

    const sortableServices = [...services];
    sortableServices.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return sortDirection === "asc" ? 1 : -1;
        if (bValue == null) return sortDirection === "asc" ? -1 : 1;

        if (sortField === "last_run" || sortField === "created_at") {
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
    return sortableServices;
};

export const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "online": return "default" as const;
        case "warning": return "secondary" as const;
        case "error":
        case "offline": return "destructive" as const;
        default: return "outline" as const;
    }
};