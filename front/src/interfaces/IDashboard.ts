export interface IDashboardStats {
    systemUptime: string
    averageServiceInterval: string
    servicesCreated: number
    servicesActiveCreated: number
}

export interface IJobStats {
    activeJobs: number;
}


export interface IGroupStats {
    totalGroups: number
    totalUsers: number
}

export interface IVolumetryData {
    timestamp: string
    volume: number
}
