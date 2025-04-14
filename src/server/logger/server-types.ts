import { Pagination } from "@/lib/types/pagination.type";

export type LoggerLevel = {
    level: string;
}

export type Logger = {
    message: string,
    level: string,
    timestamp: Date
}

export type LoggerQuery = {
    level?: string;
} & Pagination;