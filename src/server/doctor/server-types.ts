import { Option } from "@/lib/types/option.type";
import { Order, Pagination } from "@/lib/types/pagination.type";

export type Doctor = {
    userId: string;
    userDni: string;
    userEmail: string;
    userName: string;
    userLastname: string;
    userHasAuth: boolean;
    doctorSignature: string;
    doctorHasFile: boolean;
}

export type DoctorOption = Option;

export type DoctorQuery = {
    filter?: string;
} & Order<Doctor> & Pagination;
