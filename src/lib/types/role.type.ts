import { ClaimEnum } from "..";

export type Role = {
    id: number;
    name: string;
    resources: {
        id: number;
        name: string;
        claim: ClaimEnum
    }
}
