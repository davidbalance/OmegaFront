import { ApiResource } from "../_base/api-client.types";

const endpoints = {
    //#region Logger
    retriveLogger: {
        resource: 'logger',
        method: 'get',
    } as ApiResource,
    retriveLoggerLevels: {
        resource: 'logger/levels',
        method: 'get',
    } as ApiResource,
    //#endregion

    //#region Disease
    retriveDiseaseGroups: {
        resource: 'disease-groups',
        method: 'get',
    } as ApiResource,
    retriveDiseaseGroup: {
        resource: 'disease-groups/group/:groupId',
        method: 'get',
    } as ApiResource,
    retriveDiseaseGroupOptions: {
        resource: 'disease-groups/options',
        method: 'get',
    } as ApiResource,
    createDiseaseGroup: {
        resource: 'disease-group/write',
        method: 'post',
    } as ApiResource,
    editDiseaseGroup: {
        resource: 'disease-group/write/:groupId',
        method: 'put',
    } as ApiResource,
    removeDiseaseGroup: {
        resource: 'disease-group/write/:groupId',
        method: 'delete',
    } as ApiResource,

    retriveDiseases: {
        resource: 'diseases/:groupId',
        method: 'get',
    } as ApiResource,
    retriveDisease: {
        resource: 'diseases/disease/:diseaseId',
        method: 'get',
    } as ApiResource,
    createDisease: {
        resource: 'disease/write',
        method: 'post',
    } as ApiResource,
    editDisease: {
        resource: 'disease/write/:groupId/:diseaseId',
        method: 'put',
    } as ApiResource,
    moveDiseaseToGroup: {
        resource: 'disease/write/:groupId/:diseaseId/move',
        method: 'put',
    } as ApiResource,
    removeDisease: {
        resource: 'disease/write/:groupId/:diseaseId',
        method: 'delete',
    } as ApiResource,
    //#endregion

    //#region Location
    retriveAreas: {
        resource: 'areas',
        method: 'get',
    } as ApiResource,
    retriveArea: {
        resource: 'areas/area/:areaId',
        method: 'get',
    } as ApiResource,
    retriveAreaOptions: {
        resource: 'areas/options',
        method: 'get',
    } as ApiResource,
    createArea: {
        resource: 'area/write',
        method: 'post',
    } as ApiResource,
    editArea: {
        resource: 'area/write/:areaId',
        method: 'put',
    } as ApiResource,
    removeArea: {
        resource: 'area/write/:areaId',
        method: 'delete',
    } as ApiResource,

    retriveManagements: {
        resource: 'managements',
        method: 'get',
    } as ApiResource,
    retriveManagement: {
        resource: 'managements/management/:managementId',
        method: 'get',
    } as ApiResource,
    retriveManagementOptions: {
        resource: 'managements/options',
        method: 'get',
    } as ApiResource,
    createManagement: {
        resource: 'management/write',
        method: 'post',
    } as ApiResource,
    editManagement: {
        resource: 'management/write/:managementId',
        method: 'put',
    } as ApiResource,
    removeManagement: {
        resource: 'management/write/:managementId',
        method: 'delete',
    } as ApiResource,

    retriveJobPositions: {
        resource: 'job-positions',
        method: 'get',
    } as ApiResource,
    retriveJobPosition: {
        resource: 'job-positions/job-position/:jobPositionId',
        method: 'get',
    } as ApiResource,
    retriveJobPositionsOptions: {
        resource: 'job-positions/options',
        method: 'get',
    } as ApiResource,

    retriveBranches: {
        resource: 'branches/:companyId',
        method: 'get',
    } as ApiResource,
    retriveCompanies: {
        resource: 'companies/:corporativeId',
        method: 'get',
    } as ApiResource,
    retriveCorporatives: {
        resource: 'corporatives',
        method: 'get',
    } as ApiResource,
    retriveCorporativesOptions: {
        resource: 'corporatives/options',
        method: 'get',
    } as ApiResource,
    //#endregion

    //#region Profile
    findMe: {
        resource: 'auth/introspect',
        method: 'get',
    } as ApiResource,
    retriveUsers: {
        resource: 'users',
        method: 'get',
    } as ApiResource,
    retriveUser: {
        resource: 'users/:userId',
        method: 'get',
    } as ApiResource,
    createUser: {
        resource: 'user/write',
        method: 'post',
    } as ApiResource,
    addAuthUser: {
        resource: 'user/write/auth',
        method: 'post',
    } as ApiResource,
    editUser: {
        resource: 'user/write/:userId',
        method: 'put',
    } as ApiResource,
    removeUser: {
        resource: 'user/write/:userId',
        method: 'delete',
    } as ApiResource,

    retriveUserResources: {
        resource: 'users/:userId/resources',
        method: 'get',
    } as ApiResource,
    addUserResource: {
        resource: 'user/write/resources',
        method: 'post',
    } as ApiResource,

    retriveUserAttribute: {
        resource: 'users/:userId/attribute/:attributeName',
        method: 'get',
    } as ApiResource,
    addUserAttribute: {
        resource: 'user/write/attribute',
        method: 'post',
    } as ApiResource,
    removeUserAttribute: {
        resource: 'user/write/:userId/:attributeName',
        method: 'post',
    } as ApiResource,

    retriveDoctors: {
        resource: 'doctors',
        method: 'get',
    } as ApiResource,
    retriveDoctor: {
        resource: 'doctors/user/:userId',
        method: 'get',
    } as ApiResource,
    retriveDoctorsOptions: {
        resource: 'doctors/options',
        method: 'get',
    } as ApiResource,
    retriveDoctorFile: {
        resource: 'doctors/file/:userId',
        method: 'get',
    } as ApiResource,
    uploadDoctorSignature: {
        resource: 'doctor/write/signature/:userId',
        method: 'post',
    } as ApiResource,
    //#endregion

    //#region Laboratory
    retriveExams: {
        resource: 'exams/:subtypeId',
        method: 'get',
    } as ApiResource,
    retriveExam: {
        resource: 'exams/exam/:examId',
        method: 'get',
    } as ApiResource,
    editExam: {
        resource: 'exam/write/:typeId/:subtypeId/:examId',
        method: 'put',
    } as ApiResource,
    moveExam: {
        resource: 'exam/write/:typeId/:subtypeId/:examId/move',
        method: 'put',
    } as ApiResource,

    retriveExamSubtypes: {
        resource: 'exam-subtypes/:typeId',
        method: 'get',
    } as ApiResource,
    retriveExamSubtype: {
        resource: 'exam-subtypes/subtype/:subtypeId',
        method: 'get',
    } as ApiResource,
    createExamSubtype: {
        resource: 'exam-subtype/write',
        method: 'post',
    } as ApiResource,
    editExamSubtype: {
        resource: 'exam-subtype/write/:typeId/:subtypeId',
        method: 'put',
    } as ApiResource,
    moveExamSubtype: {
        resource: 'exam-subtype/write/:typeId/:subtypeId/move',
        method: 'put',
    } as ApiResource,
    removeExamSubtype: {
        resource: 'exam-subtype/write/:typeId/:subtypeId',
        method: 'delete',
    } as ApiResource,

    retriveExamTypes: {
        resource: 'exam-types',
        method: 'get',
    } as ApiResource,
    retriveExamTypesOptions: {
        resource: 'exam-types/options',
        method: 'get',
    } as ApiResource,
    //#endregion

    //#region WebClient
    retriveLogos: {
        resource: 'logos',
        method: 'get',
    } as ApiResource,

    retriveResources: {
        resource: 'resources',
        method: 'get',
    } as ApiResource,
    retriveResource: {
        resource: 'resources/:resourceId',
        method: 'get',
    } as ApiResource,
    createResource: {
        resource: 'resource/write',
        method: 'post',
    } as ApiResource,
    editResource: {
        resource: 'resource/write/:resourceId',
        method: 'patch',
    } as ApiResource,
    removeResource: {
        resource: 'resource/write/:resourceId',
        method: 'delete',
    } as ApiResource,
    //#endregion

    //#region Medical
    retriveClientByDni: {
        resource: 'medical-clients/:patientDni/patient',
        method: 'get',
    } as ApiResource,
    retriveClients: {
        resource: 'medical-clients',
        method: 'get',
    } as ApiResource,
    retriveClientsCompany: {
        resource: 'medical-clients/company',
        method: 'get',
    } as ApiResource,
    retriveClientsEEQ: {
        resource: 'medical-clients/eeq',
        method: 'get',
    } as ApiResource,
    retriveClientsDoctor: {
        resource: 'medical-clients/doctor',
        method: 'get',
    } as ApiResource,
    retriveClientEmails: {
        resource: 'medical-clients/:dni/emails',
        method: 'get',
    } as ApiResource,
    retriveClientArea: {
        resource: 'medical-clients/:dni/area',
        method: 'get',
    } as ApiResource,
    retriveClientJobPosition: {
        resource: 'medical-clients/:dni/job-position',
        method: 'get',
    } as ApiResource,
    retriveClientManagement: {
        resource: 'medical-clients/:dni/management',
        method: 'get',
    } as ApiResource,
    createClient: {
        resource: 'medical-client/write',
        method: 'post',
    } as ApiResource,
    addAreaClient: {
        resource: 'medical-client/write/:dni/area',
        method: 'put',
    } as ApiResource,
    addJobPositionClient: {
        resource: 'medical-client/write/:dni/job-position',
        method: 'put',
    } as ApiResource,
    addManagementClient: {
        resource: 'medical-client/write/:dni/management',
        method: 'put',
    } as ApiResource,
    createClientEmail: {
        resource: 'medical-client/write/email',
        method: 'post',
    } as ApiResource,
    defaultClientEmail: {
        resource: 'medical-client/write/:patientDni/email/:emailId',
        method: 'put',
    } as ApiResource,
    removeClientEmail: {
        resource: 'medical-client/write/:patientDni/email/:emailId',
        method: 'delete',
    } as ApiResource,
    massiveLoadClient: {
        resource: 'medical-client/write/massive-load/excel',
        method: 'post',
    } as ApiResource,

    retriveClientRecords: {
        resource: 'medical-client/records/:patientDni',
        method: 'get',
    } as ApiResource,
    retriveClientRecordFile: {
        resource: 'medical-client/records/record/:recordId',
        method: 'get',
    } as ApiResource,
    createClientRecord: {
        resource: 'medical-client/write/:patientDni/record/:type',
        method: 'post',
    } as ApiResource,

    retriveProcesses: {
        resource: 'processes',
        method: 'get',
    } as ApiResource,
    retriveYears: {
        resource: 'years',
        method: 'get',
    } as ApiResource,

    retriveMedicalOrders: {
        resource: 'medical-orders/:patientDni',
        method: 'get',
    } as ApiResource,
    retriveMedicalOrder: {
        resource: 'medical-orders/order/:orderId',
        method: 'get',
    } as ApiResource,
    retriveMedicalOrdersPatient: {
        resource: 'medical-orders/orders/patient',
        method: 'get',
    } as ApiResource,
    retriveMedicalCloud: {
        resource: 'medical-orders/cloud/:orderId',
        method: 'get',
    } as ApiResource,
    retriveMedicalChecklist: {
        resource: 'medical-orders/checklist/:orderId',
        method: 'get',
    } as ApiResource,
    retriveMedicalChecklistFile: {
        resource: 'medical-orders/checklist/:orderId/file',
        method: 'get',
    } as ApiResource,
    retriveMedicalOrdersDoctor: {
        resource: 'medical-orders/doctor/:patientDni',
        method: 'get',
    } as ApiResource,
    createMedicalOrder: {
        resource: 'medical-order/write',
        method: 'post',
    } as ApiResource,
    removeMedicalOrder: {
        resource: 'medical-order/write/:orderId',
        method: 'delete',
    } as ApiResource,
    sendMedicalOrder: {
        resource: 'medical-order/write/send-email',
        method: 'post',
    } as ApiResource,
    changeStatusMedicalOrder: {
        resource: 'medical-order/write/:orderId/:status',
        method: 'put',
    } as ApiResource,

    retriveMedicalDiseases: {
        resource: 'medical-tests/:testId/diseases',
        method: 'get',
    } as ApiResource,
    retriveMedicalDisease: {
        resource: 'medical-tests/:testId/diseases/:diseaseId',
        method: 'get',
    } as ApiResource,
    retriveMedicalReport: {
        resource: 'medical-tests/:testId/report',
        method: 'get',
    } as ApiResource,
    retriveMedicalReportFile: {
        resource: 'medical-tests/:testId/report/file',
        method: 'get',
    } as ApiResource,
    retriveMedicalResultFile: {
        resource: 'medical-tests/:testId/result/file',
        method: 'get',
    } as ApiResource,
    retriveMedicalTests: {
        resource: 'medical-tests/:orderId',
        method: 'get',
    } as ApiResource,
    retriveMedicalTest: {
        resource: 'medical-tests/:testId/test',
        method: 'get',
    } as ApiResource,
    retriveMedicalDiseaseReportFile: {
        resource: 'medical-tests/disease-report/file',
        method: 'get',
    } as ApiResource,
    createMedicalResultDisease: {
        resource: 'medical-test/write/disease',
        method: 'post',
    } as ApiResource,
    editMedicalResultDisease: {
        resource: 'medical-test/write/:testId/disease/:diseaseReportId',
        method: 'put',
    } as ApiResource,
    removeMedicalResultDisease: {
        resource: 'medical-test/write/:testId/disease/:diseaseReportId',
        method: 'delete',
    } as ApiResource,
    addMedicalReport: {
        resource: 'medical-test/write/:testId/report',
        method: 'put',
    } as ApiResource,
    addMedicalReportFile: {
        resource: 'medical-test/write/:testId/report',
        method: 'post',
    } as ApiResource,
    removeMedicalReport: {
        resource: 'medical-test/write/:testId/report',
        method: 'delete',
    } as ApiResource,
    addMedicalResult: {
        resource: 'medical-test/write/:testId/result',
        method: 'post',
    } as ApiResource,
    removeMedicalResult: {
        resource: 'medical-test/write/:testId/result',
        method: 'delete',
    } as ApiResource,
    checkMedicalTest: {
        resource: 'medical-test/write/:testId/check',
        method: 'put',
    } as ApiResource,
    createMedicalTest: {
        resource: 'medical-test/write',
        method: 'post',
    } as ApiResource,
    editMedicalTestExam: {
        resource: 'medical-test/write/:testId/exam',
        method: 'put',
    } as ApiResource,
    uncheckMedicalTest: {
        resource: 'medical-test/write/:testId/uncheck',
        method: 'put',
    } as ApiResource,

    retriveMedicalTestFileReport: {
        resource: 'medical-tests/found-file/report',
        method: 'get',
    } as ApiResource,
    retriveMedicalTestFileCount: {
        resource: 'medical-tests/found-file/count',
        method: 'get',
    } as ApiResource,
    checkMedicalTestFile: {
        resource: 'medical-test/write/file/check',
        method: 'post',
    } as ApiResource,

    retriveMedicalTestZip: {
        resource: 'medical-tests/zip/file',
        method: 'post',
    } as ApiResource,
    //#endregion

    //#region Health Check
    healthCheck: {
        resource: 'health/check',
        method: 'get',
    } as ApiResource,
    //#endregion

    //#region Apikey
    retriveApiKeys: {
        resource: 'api-keys',
        method: 'get',
    } as ApiResource,
    createApiKey: {
        resource: 'auth/write/apikey',
        method: 'post',
    } as ApiResource,
    removeApiKey: {
        resource: 'auth/write/apikey/:apikeyId',
        method: 'delete',
    } as ApiResource,
    //#endregion
}

export default endpoints;