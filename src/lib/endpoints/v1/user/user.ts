import { root } from "../../config";

const baseUrl: string = 'users';

const baseUrlAttribute: string = 'user/attribute'

export const USER = {
    FIND_ALL: `${root}/${baseUrl}`,
    CREATE: `${root}/${baseUrl}`,
    FIND_CURRENT: `${root}/${baseUrl}/user`,
    UPDATE_ONE: (key: number) => `${root}/${baseUrl}/${key}`,
    DELETE_ONE: (key: number) => `${root}/${baseUrl}/${key}`,
    ATTRIBUTES: {
        LOOK_FOR: {
            FIND: (id: number) => `${root}/${baseUrlAttribute}/look/for/company/${id}`,
            UPDATE_ONE: (id: number) => `${root}/${baseUrlAttribute}/look/for/company/${id}`
        },
        DOCTOR_OF: {
            FIND: (id: number) => `${root}/${baseUrlAttribute}/doctor/of/${id}`,
            UPDATE_ONE: (id: number) => `${root}/${baseUrlAttribute}/doctor/of/${id}`
        },
        EMPLOYEE: {
            FIND: (id: number) => `${root}/${baseUrlAttribute}/employee/of/${id}`,
            UPDATE_ONE: (id: number) => `${root}/${baseUrlAttribute}/employee/of/${id}`
        }
    }
}