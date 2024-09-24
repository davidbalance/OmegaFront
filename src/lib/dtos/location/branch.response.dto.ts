import { City } from "./city.response.dto";

export interface Branch {
    id: number;
    name: string;
    city: City;
}

export interface GETBranchResponseDto {
    branches: Branch[];
}