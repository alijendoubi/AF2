export interface DashboardStats {
    totalUsers: number;
    activeSubscriptions: number;
    monthlyRevenue: number;
    systemHealth: SystemHealth;
}

export interface SystemHealth {
    status: 'healthy' | 'warning' | 'critical';
    uptime: number;
    lastChecked: Date;
    issues: SystemIssue[];
}

export interface SystemIssue {
    id: string;
    type: 'error' | 'warning';
    message: string;
    timestamp: Date;
}

export interface ActivityLog {
    id: string;
    userId: string;
    action: string;
    details: string;
    timestamp: Date;
}

