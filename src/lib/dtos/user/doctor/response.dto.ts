import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { Doctor } from "./base.response.dto";

export interface GetDoctorResponseDto extends Doctor { }

export interface GetDoctorArrayResponseDto extends ObjectArray<Doctor> { }