import { CredentialAPI, AuthenticationAPI, UserAPI, WebAppConfigurationAPI, RoleAPI, PermissionAPI, ExamAPI, OrderAPI, ResultAPI, MorbidityGroupAPI, MorbidityAPI, MedicalReportAPI, MedicalReportElementAPI, PatientAPI, DoctorAPI } from "./endpoint.type";

const root: string = process.env.NEXT_PUBLIC_ROOT_API || 'localhost';

export default Object.freeze({
    AUTH: {
        V1: {
            LOGIN: `${root}/auth/login`,
            LOGOUT: `${root}/auth/logout`,
            REFRESH: `${root}/auth/refresh`,
        } as AuthenticationAPI
    },
    CREDENTIAL: {
        V1: {
            PASSWORD: `${root}/credential`
        } as CredentialAPI
    },
    USER: {
        V1: {
            CREATE: `${root}/credential`,
            FIND: `${root}/users`,
            FIND_ONE: (id: number) => `${root}/users/${id}`,
            FIND_ONE_AND_UPDATE: (id: number) => `${root}/users/${id}`,
            FIND_ONE_AND_INACTIVE: (id: number) => `${root}/users/${id}`,
        } as UserAPI
    },
    PATIENT: {
        V1: {
            FIND: `${root}/patients`
        } as PatientAPI
    },
    DOCTOR: {
        V1: {
            FIND: `${root}/doctors`
        } as DoctorAPI
    },
    ROLE: {
        V1: {
            FIND: `${root}/roles`,
            CREATE: `${root}/roles`,
            FIND_ONE_AND_UPDATE: (id: number) => `${root}/roles/${id}`,
            FIND_ONE_AND_INACTIVE: (id: number) => `${root}/roles/${id}`,
        } as RoleAPI
    },
    PERMISSION: {
        V1: {
            FIND: `${root}/permissions`
        } as PermissionAPI
    },
    EXAM: {
        V1: {
            FIND: `${root}/exams`
        } as ExamAPI
    },
    ORDER: {
        V1: {
            FIND: `${root}/orders`
        } as OrderAPI
    },
    RESULT: {
        V1: {
            FIND: `${root}/results`,
            FIND_ONE_AND_INSERT_MORBIDITY: (id: number) => `${root}/results/${id}`
        } as ResultAPI
    },
    MORBIDITY_GROUP: {
        V1: {
            FIND: `${root}/morbidity-groups`,
            CREATE: `${root}/morbidity-groups`,
            FIND_ONE_AND_UPDATE: (id: number) => `${root}/morbidity-groups/${id}`,
            FIND_ONE_AND_INACTIVE: (id: number) => `${root}/morbidity-groups/${id}`,
        } as MorbidityGroupAPI
    },
    MORBIDITY: {
        V1: {
            FIND: `${root}/morbidities`,
            CREATE: `${root}/morbidities`,
            FIND_ONE: (id: number) => `${root}/morbidities/${id}`,
            FIND_ONE_AND_UPDATE: (id: number) => `${root}/morbidities/${id}`,
            FIND_ONE_AND_INACTIVE: (id: number) => `${root}/morbidities/${id}`
        } as MorbidityAPI
    },
    MEDICAL_REPORT: {
        V1: {
            CREATE: `${root}/medical-report`
        } as MedicalReportAPI
    },
    MEDICAL_REPORT_ELEMENT: {
        V1: {
            FIND: `${root}/report-element`
        } as MedicalReportElementAPI
    },
    CONFIGURATION: {
        V1: {
            CONFIGURATION: `${root}/omega-web/clients`
        } as WebAppConfigurationAPI
    }
});