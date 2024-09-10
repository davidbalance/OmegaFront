import { ApiResource } from '../base/api-resource.type';

const omegaAuthenticationEndpoint = {
    sessionWithLogin: 'auth/login',
    sessionRefresh: 'auth/refresh',
    revokeSession: 'auth/logout'
}

const omegaSessionEnpoint = {
    sessionCreate: 'session',
    sessionDetail: 'session/:session',
    sessionUpdate: 'session/:session',
    sessionDelete: 'session/:session',
}

const omegaMethodEndpoint = {
    //#region Logger
    logDetails: {
        resource: 'logs',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    logLevel: {
        resource: 'logs/level',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    //#endregion

    //#region Disease
    diseaseCreate: {
        resource: 'diseases',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    diseaseDetail: {
        resource: 'diseases/disease/:id',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    diseaseUpdate: {
        resource: 'diseases/disease/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    diseaseDelete: {
        resource: 'diseases/disease/:id',
        method: 'delete',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    diseaseSearch: {
        resource: 'disease/:group/diseases/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    diseasePages: {
        resource: 'disease/:group/diseases/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,

    diseaseGroupCreate: {
        resource: 'disease/groups',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    diseaseGroupDetail: {
        resource: 'disease/groups/group/:id',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    diseaseGroupUpdate: {
        resource: 'disease/groups/group/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    diseaseGroupDelete: {
        resource: 'disease/groups/group/:id',
        method: 'delete',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    diseaseGroupHasDiseases: {
        resource: 'disease/groups/:id/has/diseases',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    diseaseGroupOptions: {
        resource: 'disease/groups/options',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    diseaseGroupSearch: {
        resource: 'disease/groups/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    diseaseGroupPages: {
        resource: 'disease/groups/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    //#endregion

    //#region Location
    corporativeGroupOptions: {
        resource: 'location/groups/options',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    corporativeGroupSearch: {
        resource: 'location/groups/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    corporativeGroupPages: {
        resource: 'location/groups/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,

    companySearch: {
        resource: 'location/:group/companies/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    companyPages: {
        resource: 'location/:group/companies/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,

    branchSearch: {
        resource: 'location/:company/branches/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    branchPages: {
        resource: 'location/:company/branches/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,

    managementOptions: {
        resource: 'management/options',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    managementSearch: {
        resource: 'location/managements/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    managementPages: {
        resource: 'location/managements/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    managementCreate: {
        resource: 'management',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    managementDetail: {
        resource: 'management/:id',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    managementUpdate: {
        resource: 'management/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    managementDelete: {
        resource: 'management/:id',
        method: 'delete',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    managementHasAreas: {
        resource: 'management/:id/has/areas',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,

    areaCreate: {
        resource: 'areas',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    areaDetail: {
        resource: 'areas/area/:id',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    areaUpdate: {
        resource: 'areas/area/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    areaDelete: {
        resource: 'areas/area/:id',
        method: 'delete',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    areaSearch: {
        resource: 'location/:management/areas/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    areaPages: {
        resource: 'location/:management/areas/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,

    jobpositionSearch: {
        resource: 'location/jobposition/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    jobpositionPages: {
        resource: 'location/jobposition/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    jobpositionOptions: {
        resource: 'location/jobposition/options',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    //#endregion

    //#region User
    accountDetail: {
        resource: 'users/user',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    userDetail: {
        resource: 'users/user/:id',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    userCreate: {
        resource: 'users',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    userUpdate: {
        resource: 'users/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    userDelete: {
        resource: 'users/:id',
        method: 'delete',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    userSearch: {
        resource: 'user/users/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    userPages: {
        resource: 'user/users/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,

    userAttributeLookForCompanyDetail: {
        resource: 'user/attribute/look/for/company/:id',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    userAttributeLookForCompanyUpdate: {
        resource: 'user/attribute/look/for/company/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    userAttributeDoctorOfDetail: {
        resource: 'user/attribute/doctor/of/:id',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    userAttributeDoctorOfUpdate: {
        resource: 'user/attribute/doctor/of/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    userAttributeEmployeeOfDetail: {
        resource: 'user/attribute/employee/of/:id',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    userAttributeEmployeeOfUpdate: {
        resource: 'user/attribute/employee/of/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,

    patientLookCompanySearch: {
        resource: 'patients/look/company/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    patientLookCompanyPages: {
        resource: 'patients/look/company/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    patientSearch: {
        resource: 'user/patients/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    patientPages: {
        resource: 'user/patients/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    patientEeqSearch: {
        resource: 'patients/eeq/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    patientEeqPages: {
        resource: 'patients/eeq/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,

    doctorSignatureImage: {
        resource: 'doctors/files/signature/:id',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    doctorSignatureUpload: {
        resource: 'doctors/files/signature/:id',
        method: 'post',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    doctorSearch: {
        resource: 'user/doctors/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    doctorrPages: {
        resource: 'user/doctors/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    //#endregion

    //#region Laboratory
    examTypeOptions: {
        resource: 'exam/types/options',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    examTypeSearch: {
        resource: 'laboratory/types/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    examTypePages: {
        resource: 'laboratory/types/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,

    examSubtypeCreate: {
        resource: 'exam/subtypes',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    examSubtypeDetail: {
        resource: 'exam/subtypes/subtype/:id',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    examSubtypeUpdate: {
        resource: 'exam/subtypes/subtype/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    examSubtypeDelete: {
        resource: 'exam/subtypes/subtype/:id',
        method: 'delete',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    examSubtypeHasExams: {
        resource: 'exam/subtypes/subtype/:id/has/exams',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    examSubtypeSearch: {
        resource: 'laboratory/:type/subtypes/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    examSubtypePages: {
        resource: 'laboratory/:type/subtypes/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,

    examDetail: {
        resource: 'exams/exam/:id',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    examUpdate: {
        resource: 'exams/exam/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    examSearch: {
        resource: 'laboratory/:subtype/exams/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    examPages: {
        resource: 'laboratory/:subtype/exams/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    //#endregion

    //#region WebClient
    accountLogo: {
        resource: 'omega/web/client/logo/user',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    accountResource: {
        resource: 'omega/web/client/resource/user',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    webClientLogoDetail: {
        resource: 'omega/web/client/logo/:user',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    webClientLogoUpdate: {
        resource: 'omega/web/client/logo/:user',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    webClientResourceDetails: {
        resource: 'omega/web/client/resource/:user',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    webClientResourceUpdate: {
        resource: 'omega/web/client/resource/:user',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,

    navResourceDetails: {
        resource: 'omega/nav/resources',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    webResourceDetails: {
        resource: 'omega/web/resources',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    webResourceCreate: {
        resource: 'omega/web/resources',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    webResourceUpdate: {
        resource: 'omega/web/resources/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    webResourceDelete: {
        resource: 'omega/web/resources/:id',
        method: 'delete',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    //#endregion

    //#region Medical
    medicalClientByDoctorSearch: {
        resource: 'medical/client/doctor/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalClientByDoctorPages: {
        resource: 'medical/client/doctor/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalClientJobPositionDetail: {
        resource: 'medical/client/job/position/:dni',
        method: 'get',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    medicalClientJobPositionUpdate: {
        resource: 'medical/client/job/position/:dni',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    medicalClientManagementDetail: {
        resource: 'medical/client/management/area/:dni',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalClientManagementCreate: {
        resource: 'medical/client/management/area/:dni',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,

    medicalClientEmailDetails: {
        resource: 'medical/client/email/:dni',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalClientEmailCreate: {
        resource: 'medical/client/email/:dni',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    medicalClientEmailUpdate: {
        resource: 'medical/client/email/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    medicalClientEmailDelete: {
        resource: 'medical/client/email/:id',
        method: 'delete',
        options: { customHeader: ['auth'] }
    } as ApiResource,

    medicalOrderCloudDetails: {
        resource: 'medical/orders/cloud/:id',
        method: 'get'
    } as ApiResource,
    medicalOrderByDoctorSearch: {
        resource: 'patient/:dni/medical/orders/doctor/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalOrderByDoctorPages: {
        resource: 'patient/:dni/medical/orders/doctor/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalOrderExpandedSearch: {
        resource: 'medical/orders/expanded/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalOrderExpandedPages: {
        resource: 'medical/orders/expanded/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalOrderMail: {
        resource: 'medical/orders/mail',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    medicalOrderSearch: {
        resource: 'patient/:dni/medical/orders/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalOrderPages: {
        resource: 'patient/:dni/medical/orders/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalOrderUpdateStatusDetail: {
        resource: 'medical/orders/:id/status',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalOrderUpdateStatusValidate: {
        resource: 'medical/orders/:id/status/validate',
        method: 'patch',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalOrderUpdateStatusCreated: {
        resource: 'medical/orders/:id/status/created',
        method: 'patch',
        options: { customHeader: ['auth'] }
    } as ApiResource,

    medicalDiseaseDetail: {
        resource: 'medical/:id/disease',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalDiseaseUpdate: {
        resource: 'medical/:id/disease',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    medicalDiseaseDelete: {
        resource: 'medical/:id/disease',
        method: 'delete',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalDiseaseDetails: {
        resource: 'medical/:result/diseases',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalDiseaseCreate: {
        resource: 'medical/:result/diseases',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    medicalDiseaseYear: {
        resource: 'medical/results/report/diseases/year',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalDiseaseExport: {
        resource: 'medical/results/report/diseases',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,

    medicalResultByDoctorSearch: {
        resource: 'medical/:order/results/doctor/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalResultByDoctorPages: {
        resource: 'medical/:order/results/doctor/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalResultUpload: {
        resource: 'medical/:id/result/file',
        method: 'patch',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalResultDetail: {
        resource: 'medical/:id/result',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalResultUpdate: {
        resource: 'medical/:id/result',
        method: 'patch',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalResultSearch: {
        resource: 'medical/:order/results/paginate',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalResultPages: {
        resource: 'medical/:order/results/pages',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalResultReportDetail: {
        resource: 'medical/result/:id/report',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,

    medicalReportCreate: {
        resource: 'medical/report',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    medicalReportUpload: {
        resource: 'medical/report/file/:id',
        method: 'patch',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalReportRecreateAll: {
        resource: 'medical/report/recreate/pdf',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalReportRecreateByPatient: {
        resource: 'medical/report/recreate/pdf/:dni',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    //#endregion

    //#region Health Check
    healthCheck: {
        resource: 'health/check',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    //#endregion

    //#region Credential
    credentialCreate: {
        resource: 'credentials',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    passwordUpdate: {
        resource: 'credentials',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    //#endregion

    //#region Apikey
    apikeyDetails: {
        resource: 'api/key',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    apikeyCreate: {
        resource: 'api/key',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    //#endregion

    //#region Medical File
    medicalFileSingle: {
        resource: 'medical/file',
        method: 'post',
        options: { customHeader: ['as-json'] }
    } as ApiResource,
    medicalFileMultiple: {
        resource: 'medical/file/multiple',
        method: 'post',
        options: { customHeader: ['as-json'] }
    } as ApiResource,
    medicalFileDelete: {
        resource: 'medical/file/:type/:id',
        method: 'delete',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    //#endregion
}

const omegaEndpoint = {
    session: omegaSessionEnpoint,
    authentication: omegaAuthenticationEndpoint,
    methods: omegaMethodEndpoint
}

export default omegaEndpoint;