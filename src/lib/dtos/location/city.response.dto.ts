export interface City {
    id: number;
    name: string;
}

export interface GETCityResponseDto {
    cities: City[];
}