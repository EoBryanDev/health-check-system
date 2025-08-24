export interface DashboardStats {
    systemUptime: string
    averageServiceInterval: string
    servicesCreated: number
    servicesActiveCreated: number
}

export interface JobStats {
    activeJobs: number
    successJobs: number
    warningJobs: number
    errorJobs: number
}

export interface GroupStats {
    totalGroups: number
    totalUsers: number
}

export interface VolumetryData {
    timestamp: string
    volume: number
}
