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
    diseaseDetails: {
        resource: 'diseases',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    diseaseCreate: {
        resource: 'diseases',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    diseaseUpdate: {
        resource: 'diseases/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    diseaseDelete: {
        resource: 'diseases/:id',
        method: 'delete',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    diseaseGroupDetails: {
        resource: 'diseases/groups',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    diseaseGroupCreate: {
        resource: 'diseases/groups',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    diseaseGroupUpdate: {
        resource: 'diseases/groups/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    diseaseGroupDelete: {
        resource: 'diseases/groups/:id',
        method: 'delete',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    corporativeGroupDetails: {
        resource: 'corporative/groups',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    managementDetails: {
        resource: 'management',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    managementCreate: {
        resource: 'management',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
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
    jobpositionDetail: {
        resource: 'job/position/:dni',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    jobpositionDetails: {
        resource: 'job/position',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    jobpositionCreate: {
        resource: 'job/position',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    jobpositionUpdate: {
        resource: 'job/position/:dni',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    jobpositionDelete: {
        resource: 'job/position/:dni',
        method: 'delete',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    areaDetails: {
        resource: 'area',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    areaCreate: {
        resource: 'area',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    areaUpdate: {
        resource: 'area/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    areaDelete: {
        resource: 'area/:id',
        method: 'delete',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    userDetails: {
        resource: 'users',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
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
    userAttributeLookForCompanyDetails: {
        resource: 'user/attribute/look/for/company/:id',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    userAttributeLookForCompanyUpdate: {
        resource: 'user/attribute/look/for/company/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    userAttributeDoctorOfDetails: {
        resource: 'user/attribute/doctor/of/:id',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    userAttributeDoctorOfUpdate: {
        resource: 'user/attribute/doctor/of/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    userAttributeEmployeeOfDetails: {
        resource: 'user/attribute/employee/of/:id',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    userAttributeEmployeeOfUpdate: {
        resource: 'user/attribute/employee/of/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    patientDetails: {
        resource: 'patients',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    patientDetailsPagination: {
        resource: 'patients/paginate',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    patientByCompany: {
        resource: 'patients/look/company',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    patientEeqDetails: {
        resource: 'patients/eeq',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    patientEeqDetailsPagination: {
        resource: 'patients/eeq/paginate',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    doctorDetails: {
        resource: 'doctors',
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
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
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
    apikeyUpdate: {
        resource: 'api/key/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
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
    webClientDetails: {
        resource: 'omega/web/clients',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    webClientLogoUpdate: {
        resource: 'omega/web/clients/logos/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    webClientResourceDetails: {
        resource: 'omega/web/clients/resources/resource/:id',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    webClientResourceUpdate: {
        resource: 'omega/web/clients/resources/resource/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    navResourceDetails: {
        resource: 'omega/nav/resources',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    examUpdate: {
        resource: 'exams',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    examtypeDetails: {
        resource: 'exam/types',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    examtypeDetail: {
        resource: 'exam/types/:id',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    examtypeCreate: {
        resource: 'exam/types',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    examtypeUpdate: {
        resource: 'exam/types/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    examtypeDelete: {
        resource: 'exam/types/:id',
        method: 'delete',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    examsubtypeDetails: {
        resource: 'exam/subtypes',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    examsubtypeDetail: {
        resource: 'exam/subtypes/:id',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    examsubtypeCreate: {
        resource: 'exam/subtypes',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    examsubtypeUpdate: {
        resource: 'exam/subtypes/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    examsubtypeDelete: {
        resource: 'exam/subtypes/:id',
        method: 'delete',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalOrderCloudDetails: {
        resource: 'medical/orders/cloud/:id',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalOrderDetailsByPatient: {
        resource: 'medical/orders/patient/:dni',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalOrderDetailsByPatientAndDoctor: {
        resource: 'medical/orders/patient/:dni/doctor',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalOrderUpdateStatusValidate: {
        resource: 'medical/orders/:id/status/validate',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    medicalOrderUpdateStatusCreated: {
        resource: 'medical/orders/:id/status/created',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    medicalOrderPagination: {
        resource: 'medical/orders/paginate',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    medicalOrderMail: {
        resource: 'medical/orders/mail',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    medicalResultDiseaseExport: {
        resource: 'medical/results/report/diseases',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    medicalResultDiseaseYear: {
        resource: 'medical/results/report/diseases/year',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalResultDiseaseDetails: {
        resource: 'medical/results/diseases',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalResultDiseaseDetail: {
        resource: 'medical/results/diseases/:id',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalResultDiseaseCreate: {
        resource: 'medical/results/diseases',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    medicalResultDiseaseUpdate: {
        resource: 'medical/results/diseases/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    medicalResultDiseaseDelete: {
        resource: 'medical/results/diseases/:id',
        method: 'delete',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalResultUpload: {
        resource: 'medical/results/file/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    medicalResultDetails: {
        resource: 'medical/results',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalResultDetail: {
        resource: 'medical/results/:id',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalResultByDoctor: {
        resource: 'medical/results/doctor',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalResultUpdateDisease: {
        resource: 'medical/results/:id',
        method: 'patch',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    medicalClientJobPositionDetail: {
        resource: 'medical/client/job/position/:dni',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalClientJobPositionUpdate: {
        resource: 'medical/client/job/position/:dni',
        method: 'patch',
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
    medicalClientManagementDelete: {
        resource: 'medical/client/management/area/:dni',
        method: 'delete',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalClientByDoctor: {
        resource: 'medical/client/doctor',
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
        options: { customHeader: ['auth', 'as-json'] }
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
    healthCheck: {
        resource: 'health/check',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    medicalFileSingle: {
        resource: 'medical/file',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    medicalFileMultiple: {
        resource: 'medical/file/multiple',
        method: 'post',
        options: { customHeader: ['auth', 'as-json'] }
    } as ApiResource,
    medicalFileDelete: {
        resource: 'medical/file/:type/:id',
        method: 'delete',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    selectorDisease: {
        resource: 'selector/diseases/by/group/:group',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    selectorDiseaseGroup: {
        resource: 'selector/diseases/groups',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    selectorCorporativeGroup: {
        resource: 'selector/corporative/groups',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    selectorCompany: {
        resource: 'selector/companies/:group',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    selectorBranch: {
        resource: 'selector/branches/:company',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    selectorCity: {
        resource: 'selector/cities',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
    selectorExam: {
        resource: 'selector/exams',
        method: 'get',
        options: { customHeader: ['auth'] }
    } as ApiResource,
}

const omegaEndpoint = {
    session: omegaSessionEnpoint,
    authentication: omegaAuthenticationEndpoint,
    methods: omegaMethodEndpoint
}

export default omegaEndpoint;