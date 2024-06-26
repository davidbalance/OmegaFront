export interface ServerLog {
    level: string;
    message: string;
    timestamp: Date;
}

export interface ServerLogLevel {
    level: string;
}

export interface GETLogs {
    logs: ServerLog[];
}

export interface GETLogsLevel {
    levels: ServerLogLevel[];
}