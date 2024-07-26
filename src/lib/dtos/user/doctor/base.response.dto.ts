import { User } from "../user/base.response.dto";

export interface Doctor extends User {
    user: number;
    hasFile: boolean;
}