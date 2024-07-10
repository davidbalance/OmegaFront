import { Area } from "../area/response.dto";

export interface Management {
    id: number;
    name: string;
    areas: Area
}

export interface GETManagementResponseDto extends Management { }

export interface GETManagementArrayResponseDto {
    managements: Management[];
}

export interface POSTManagementResponseDto extends Management { }

export interface PATCHManagementResponseDto extends Management { }

export interface DELETEManagementResponseDto { }