import { MorbidityGroupModel } from "./morbidity-group.model";

export type MorbidityModel = {
    id: number;
    name: string;
    group: Omit<MorbidityGroupModel, 'id'> | number
}