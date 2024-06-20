export interface ServerLog {
    level: string;
    message: string;
    timestamp: Date;
}

export interface GETLogs {
    logs: ServerLog[];
}