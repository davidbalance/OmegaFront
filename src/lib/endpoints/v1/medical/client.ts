import { root } from "../../config";

const baseUrl: string = 'medical/client';

export const MEDICAL_CLIENT = {
    JOB_POSITION: {
        FIND_ONE: (dni: string) => `${root}/${baseUrl}/job/position/${dni}`,
        UPDATE_ONE: (dni: string) => `${root}/${baseUrl}/job/position/${dni}`,
    },
    EMAIL: {
        FIND_ALL: (dni: string) => `${root}/${baseUrl}/email/${dni}`,
        CREATE: (dni: string) => `${root}/${baseUrl}/email/${dni}`,
        UPDATE_ONE: (id: number) => `${root}/${baseUrl}/email/${id}`,
        DELETE_ONE: (id: number) => `${root}/${baseUrl}/email/${id}`,
    },
    MANAGEMENT: {
        FIND_ONE: (dni: string) => `${root}/${baseUrl}/management/area/${dni}`,
        CREATE: (dni: string) => `${root}/${baseUrl}/management/area/${dni}`,
        DELETE_ONE: (dni: string) => `${root}/${baseUrl}/management/area/${dni}`,
    },
    FIND_WITH_DOCTOR: `${root}/${baseUrl}/doctor`,
}