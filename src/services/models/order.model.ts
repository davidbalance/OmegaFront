import { ResultModel } from "./result.model";

export type OrderModel = {
    id: number;
    result: ResultModel[];
    process: { name: string; };
}