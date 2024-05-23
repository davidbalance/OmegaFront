import { Resource } from "@/services/api/resource/dtos";

export type Role = {
    id: number;
    name: string;
    resources: Resource[];
}