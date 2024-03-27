export type CreateMorbidityRequestDTO = {
    name: string;
    group: number;
}

export type UpdateMorbidityRequestDTO = Partial<CreateMorbidityRequestDTO>;