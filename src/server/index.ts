import { getResult, Result, withResult } from "@/lib/utils/result.utils";
import { serverActionRetriveApiKeys, serverActionCreateApiKey } from "./apikey/actions";
import { serverActionRetriveAreas, serverActionRetriveArea, serverActionRetriveAreaOptions, serverActionCreateArea, serverActionEditArea, serverActionRemoveArea } from "./area/actions";
import { serverActionRetriveBranches, serverActionCreateBranch, serverActionMoveBranch, serverActionRemoveBranch } from "./branch/actions";
import { serverActionRetriveCompanies, serverActionCreateCompany, serverActionMoveCompany, serverActionRemoveCompany } from "./company/actions";
import { serverActionRetriveCorporatives, serverActionRetriveCorporativesOptions, serverActionCreateCorporative, serverActionRemoveCorporative } from "./corporative/actions";
import { serverActionRetriveDiseaseGroups, serverActionRetriveDiseaseGroup, serverActionRetriveDiseaseGroupOptions, serverActionCreateDiseaseGroup, serverActionEditDiseaseGroup, serverActionRemoveDiseaseGroup } from "./disease-group/actions";
import { serverActionRetriveDiseases, serverActionRetriveDisease, serverActionCreateDisease, serverActionEditDisease, serverActionMoveDiseaseToGroup, serverActionRemoveDisease } from "./disease/actions";
import { serverActionRetriveDoctors, serverActionRetriveDoctor, serverActionRetriveDoctorsOptions, serverActionRetriveDoctorFile, serverActionUploadDoctorSignature } from "./doctor/actions";
import { serverActionRetriveExamSubtypes, serverActionRetriveExamSubtype, serverActionCreateExamSubtype, serverActionEditExamSubtype, serverActionMoveExamSubtype, serverActionRemoveExamSubtype } from "./exam-subtype/actions";
import { serverActionRetriveExamTypes, serverActionRetriveExamTypesOptions } from "./exam-type/actions";
import { serverActionRetriveExams, serverActionRetriveExam, serverActionEditExam, serverActionMoveExam } from "./exam/actions";
import { serverActionRetriveJobPositions, serverActionRetriveJobPosition, serverActionRetriveJobPositionsOptions } from "./job-position/actions";
import { serverActionRetriveLogger, serverActionRetriveLoggerLevels } from "./logger/actions";
import { serverActionRetriveLogos } from "./logo/actions";
import { serverActionRetriveManagements, serverActionRetriveManagement, serverActionRetriveManagementOptions, serverActionCreateManagement, serverActionEditManagement, serverActionRemoveManagement } from "./management/actions";
import { serverActionRetriveClientByDni, serverActionRetriveClients, serverActionRetriveClientsCompany, serverActionRetriveClientsEEQ, serverActionRetriveClientsDoctor, serverActionRetriveClientEmails, serverActionRetriveClientArea, serverActionRetriveClientJobPosition, serverActionRetriveClientManagement, serverActionRetriveClientMassiveLoadTemplate, serverActionCreateClient, serverActionMassiveLoadClient, serverActionAddAreaClient, serverActionAddJobPositionClient, serverActionAddManagementClient, serverActionChangeRoleClient, serverActionCreateClientEmail, serverActionDefaultClientEmail, serverActionRemoveClientEmail } from "./medical-client/actions";
import { serverActionRetriveProcesses, serverActionRetriveYears, serverActionRetriveMedicalOrders, serverActionRetriveMedicalOrdersEEQ, serverActionRetriveMedicalOrdersCompany, serverActionRetriveMedicalOrder, serverActionRetriveMedicalOrdersPatient, serverActionRetriveMedicalCloud, serverActionRetriveMedicalChecklist, serverActionRetriveMedicalChecklistFile, serverActionRetriveMedicalOrdersDoctor, serverActionRetriveMedicalOrderMassiveLoadTemplate, serverActionCreateMedicalOrder, serverActionRemoveMedicalOrder, serverActionSendMedicalOrder, serverActionValidatedStatusMedicalOrder, serverActionCreatedStatusMedicalOrder, serverActionMassiveLoadOrder } from "./medical-order/actions";
import { serverActionRetriveMedicalDiseases, serverActionRetriveMedicalDisease, serverActionRetriveMedicalReport, serverActionRetriveMedicalReportFile, serverActionRetriveMedicalResultFile, serverActionRetriveMedicalTests, serverActionRetriveMedicalTest, serverActionRetriveMedicalDiseaseReportFile, serverActionRetriveMedicalTestFileReport, serverActionRetriveMedicalTestFileCount, serverActionCreateMedicalResultDisease, serverActionEditMedicalResultDisease, serverActionRemoveMedicalResultDisease, serverActionAddMedicalReport, serverActionAddMedicalReportFile, serverActionRemoveMedicalReport, serverActionAddMedicalResult, serverActionRemoveMedicalResult, serverActionCheckMedicalTest, serverActionRemoveMedicalTest, serverActionCreateMedicalTest, serverActionUncheckMedicalTest, serverActionCheckMedicalTestFile, serverActionEditMedicalTestExam, serverActionRetriveMedicalTestZip } from "./medical-test/actions";
import { serverActionRetriveClientRecords, serverActionRetriveClientRecordFile, serverActionCreateClientRecordInitial, serverActionCreateClientRecordPeriodic, serverActionCreateClientRecordReintegrate, serverActionCreateClientRecordRetirement, serverActionCreateClientRecordCertificate } from "./record/actions";
import { serverActionRetriveResources, serverActionRetriveResource, serverActionCreateResource, serverActionEditResource, serverActionRemoveResource } from "./resource/actions";
import { serverActionRetriveUserAttribute, serverActionAddUserAttribute, serverActionRemoveUserAttribute } from "./user-attribute/actions";
import { serverActionFindMe, serverActionRetriveUsers, serverActionRetriveUser, serverActionRetriveUserResources, serverActionCreateUser, serverActionEditUser, serverActionAddAuthUser, serverActionAddUserResource, serverActionRemoveUser } from "./user/actions";

const composedResultAction = <P extends any[], B>(f: (...params: P) => Promise<Result<B>>, g: (param: Result<B>) => B) =>
    async (...params: P) => g(await f(...params))

// export const retriveApiKeys = composedResultAction(withResult(serverActionRetriveApiKeys), getResult);
// export const createApiKey = composedResultAction(withResult(serverActionCreateApiKey), getResult);
export const retriveApiKeys = serverActionRetriveApiKeys;
export const createApiKey = composedResultAction(withResult(serverActionCreateApiKey), getResult);

export const retriveAreas = serverActionRetriveAreas;
export const retriveArea = serverActionRetriveArea;
export const retriveAreaOptions = serverActionRetriveAreaOptions;
export const createArea = composedResultAction(withResult(serverActionCreateArea), getResult);
export const editArea = composedResultAction(withResult(serverActionEditArea), getResult);
export const removeArea = composedResultAction(withResult(serverActionRemoveArea), getResult);

export const retriveBranches = serverActionRetriveBranches;
export const createBranch = composedResultAction(withResult(serverActionCreateBranch), getResult);
export const moveBranch = composedResultAction(withResult(serverActionMoveBranch), getResult);
export const removeBranch = composedResultAction(withResult(serverActionRemoveBranch), getResult);

export const retriveCompanies = serverActionRetriveCompanies;
export const createCompany = composedResultAction(withResult(serverActionCreateCompany), getResult);
export const moveCompany = composedResultAction(withResult(serverActionMoveCompany), getResult);
export const removeCompany = composedResultAction(withResult(serverActionRemoveCompany), getResult);

export const retriveCorporatives = serverActionRetriveCorporatives;
export const retriveCorporativesOptions = serverActionRetriveCorporativesOptions;
export const createCorporative = composedResultAction(withResult(serverActionCreateCorporative), getResult);
export const removeCorporative = composedResultAction(withResult(serverActionRemoveCorporative), getResult);

export const retriveDiseases = serverActionRetriveDiseases;
export const retriveDisease = serverActionRetriveDisease;
export const createDisease = composedResultAction(withResult(serverActionCreateDisease), getResult);
export const editDisease = composedResultAction(withResult(serverActionEditDisease), getResult);
export const moveDiseaseToGroup = composedResultAction(withResult(serverActionMoveDiseaseToGroup), getResult);
export const removeDisease = composedResultAction(withResult(serverActionRemoveDisease), getResult);

export const retriveDiseaseGroups = serverActionRetriveDiseaseGroups;
export const retriveDiseaseGroup = serverActionRetriveDiseaseGroup;
export const retriveDiseaseGroupOptions = serverActionRetriveDiseaseGroupOptions;
export const createDiseaseGroup = composedResultAction(withResult(serverActionCreateDiseaseGroup), getResult);
export const editDiseaseGroup = composedResultAction(withResult(serverActionEditDiseaseGroup), getResult);
export const removeDiseaseGroup = composedResultAction(withResult(serverActionRemoveDiseaseGroup), getResult);

export const retriveDoctors = serverActionRetriveDoctors;
export const retriveDoctor = serverActionRetriveDoctor;
export const retriveDoctorsOptions = serverActionRetriveDoctorsOptions;
export const retriveDoctorFile = serverActionRetriveDoctorFile;
export const uploadDoctorSignature = composedResultAction(withResult(serverActionUploadDoctorSignature), getResult);

export const retriveExams = serverActionRetriveExams;
export const retriveExam = serverActionRetriveExam;
export const editExam = composedResultAction(withResult(serverActionEditExam), getResult);
export const moveExam = composedResultAction(withResult(serverActionMoveExam), getResult);

export const retriveExamSubtypes = serverActionRetriveExamSubtypes;
export const retriveExamSubtype = serverActionRetriveExamSubtype;
export const createExamSubtype = composedResultAction(withResult(serverActionCreateExamSubtype), getResult);
export const editExamSubtype = composedResultAction(withResult(serverActionEditExamSubtype), getResult);
export const moveExamSubtype = composedResultAction(withResult(serverActionMoveExamSubtype), getResult);
export const removeExamSubtype = composedResultAction(withResult(serverActionRemoveExamSubtype), getResult);

export const retriveExamTypes = serverActionRetriveExamTypes;
export const retriveExamTypesOptions = serverActionRetriveExamTypesOptions;

export const retriveJobPositions = serverActionRetriveJobPositions;
export const retriveJobPosition = serverActionRetriveJobPosition;
export const retriveJobPositionsOptions = serverActionRetriveJobPositionsOptions;

export const retriveLogger = serverActionRetriveLogger;
export const retriveLoggerLevels = serverActionRetriveLoggerLevels;

export const retriveLogos = serverActionRetriveLogos;

export const retriveManagements = serverActionRetriveManagements;
export const retriveManagement = serverActionRetriveManagement;
export const retriveManagementOptions = serverActionRetriveManagementOptions;
export const createManagement = composedResultAction(withResult(serverActionCreateManagement), getResult);
export const editManagement = composedResultAction(withResult(serverActionEditManagement), getResult);
export const removeManagement = composedResultAction(withResult(serverActionRemoveManagement), getResult);

export const retriveClientByDni = serverActionRetriveClientByDni;
export const retriveClients = serverActionRetriveClients;
export const retriveClientsCompany = serverActionRetriveClientsCompany;
export const retriveClientsEEQ = serverActionRetriveClientsEEQ;
export const retriveClientsDoctor = serverActionRetriveClientsDoctor;
export const retriveClientEmails = serverActionRetriveClientEmails;
export const retriveClientArea = serverActionRetriveClientArea;
export const retriveClientJobPosition = serverActionRetriveClientJobPosition;
export const retriveClientManagement = serverActionRetriveClientManagement;
export const retriveClientMassiveLoadTemplate = serverActionRetriveClientMassiveLoadTemplate;
export const createClient = composedResultAction(withResult(serverActionCreateClient), getResult);
export const massiveLoadClient = composedResultAction(withResult(serverActionMassiveLoadClient), getResult);
export const addAreaClient = composedResultAction(withResult(serverActionAddAreaClient), getResult);
export const addJobPositionClient = composedResultAction(withResult(serverActionAddJobPositionClient), getResult);
export const addManagementClient = composedResultAction(withResult(serverActionAddManagementClient), getResult);
export const changeRoleClient = composedResultAction(withResult(serverActionChangeRoleClient), getResult);
export const createClientEmail = composedResultAction(withResult(serverActionCreateClientEmail), getResult);
export const defaultClientEmail = composedResultAction(withResult(serverActionDefaultClientEmail), getResult);
export const removeClientEmail = composedResultAction(withResult(serverActionRemoveClientEmail), getResult);

export const retriveProcesses = serverActionRetriveProcesses;
export const retriveYears = serverActionRetriveYears;
export const retriveMedicalOrders = serverActionRetriveMedicalOrders;
export const retriveMedicalOrdersEEQ = serverActionRetriveMedicalOrdersEEQ;
export const retriveMedicalOrdersCompany = serverActionRetriveMedicalOrdersCompany;
export const retriveMedicalOrder = serverActionRetriveMedicalOrder;
export const retriveMedicalOrdersPatient = serverActionRetriveMedicalOrdersPatient;
export const retriveMedicalCloud = serverActionRetriveMedicalCloud;
export const retriveMedicalChecklist = serverActionRetriveMedicalChecklist;
export const retriveMedicalChecklistFile = serverActionRetriveMedicalChecklistFile;
export const retriveMedicalOrdersDoctor = serverActionRetriveMedicalOrdersDoctor;
export const retriveMedicalOrderMassiveLoadTemplate = serverActionRetriveMedicalOrderMassiveLoadTemplate;
export const createMedicalOrder = composedResultAction(withResult(serverActionCreateMedicalOrder), getResult);
export const removeMedicalOrder = composedResultAction(withResult(serverActionRemoveMedicalOrder), getResult);
export const sendMedicalOrder = composedResultAction(withResult(serverActionSendMedicalOrder), getResult);
export const validatedStatusMedicalOrder = composedResultAction(withResult(serverActionValidatedStatusMedicalOrder), getResult);
export const createdStatusMedicalOrder = composedResultAction(withResult(serverActionCreatedStatusMedicalOrder), getResult);
export const massiveLoadOrder = composedResultAction(withResult(serverActionMassiveLoadOrder), getResult);

export const retriveMedicalDiseases = serverActionRetriveMedicalDiseases;
export const retriveMedicalDisease = serverActionRetriveMedicalDisease;
export const retriveMedicalReport = serverActionRetriveMedicalReport;
export const retriveMedicalReportFile = serverActionRetriveMedicalReportFile;
export const retriveMedicalResultFile = serverActionRetriveMedicalResultFile;
export const retriveMedicalTests = serverActionRetriveMedicalTests;
export const retriveMedicalTest = serverActionRetriveMedicalTest;
export const retriveMedicalDiseaseReportFile = serverActionRetriveMedicalDiseaseReportFile;
export const retriveMedicalTestFileReport = serverActionRetriveMedicalTestFileReport;
export const retriveMedicalTestFileCount = serverActionRetriveMedicalTestFileCount;
export const createMedicalResultDisease = composedResultAction(withResult(serverActionCreateMedicalResultDisease), getResult);
export const editMedicalResultDisease = composedResultAction(withResult(serverActionEditMedicalResultDisease), getResult);
export const removeMedicalResultDisease = composedResultAction(withResult(serverActionRemoveMedicalResultDisease), getResult);
export const addMedicalReport = composedResultAction(withResult(serverActionAddMedicalReport), getResult);
export const addMedicalReportFile = composedResultAction(withResult(serverActionAddMedicalReportFile), getResult);
export const removeMedicalReport = composedResultAction(withResult(serverActionRemoveMedicalReport), getResult);
export const addMedicalResult = composedResultAction(withResult(serverActionAddMedicalResult), getResult);
export const removeMedicalResult = composedResultAction(withResult(serverActionRemoveMedicalResult), getResult);
export const checkMedicalTest = composedResultAction(withResult(serverActionCheckMedicalTest), getResult);
export const removeMedicalTest = composedResultAction(withResult(serverActionRemoveMedicalTest), getResult);
export const createMedicalTest = composedResultAction(withResult(serverActionCreateMedicalTest), getResult);
export const uncheckMedicalTest = composedResultAction(withResult(serverActionUncheckMedicalTest), getResult);
export const checkMedicalTestFile = composedResultAction(withResult(serverActionCheckMedicalTestFile), getResult);
export const editMedicalTestExam = composedResultAction(withResult(serverActionEditMedicalTestExam), getResult);
export const retriveMedicalTestZip = composedResultAction(withResult(serverActionRetriveMedicalTestZip), getResult);

export const retriveClientRecords = serverActionRetriveClientRecords;
export const retriveClientRecordFile = serverActionRetriveClientRecordFile;
export const createClientRecordInitial = composedResultAction(withResult(serverActionCreateClientRecordInitial), getResult);
export const createClientRecordPeriodic = composedResultAction(withResult(serverActionCreateClientRecordPeriodic), getResult);
export const createClientRecordReintegrate = composedResultAction(withResult(serverActionCreateClientRecordReintegrate), getResult);
export const createClientRecordRetirement = composedResultAction(withResult(serverActionCreateClientRecordRetirement), getResult);
export const createClientRecordCertificate = composedResultAction(withResult(serverActionCreateClientRecordCertificate), getResult);

export const retriveResources = serverActionRetriveResources;
export const retriveResource = serverActionRetriveResource;
export const createResource = composedResultAction(withResult(serverActionCreateResource), getResult);
export const editResource = composedResultAction(withResult(serverActionEditResource), getResult);
export const removeResource = composedResultAction(withResult(serverActionRemoveResource), getResult);

export const findMe = serverActionFindMe;
export const retriveUsers = serverActionRetriveUsers;
export const retriveUser = serverActionRetriveUser;
export const retriveUserResources = serverActionRetriveUserResources;
export const createUser = composedResultAction(withResult(serverActionCreateUser), getResult);
export const editUser = composedResultAction(withResult(serverActionEditUser), getResult);
export const addAuthUser = composedResultAction(withResult(serverActionAddAuthUser), getResult);
export const addUserResource = composedResultAction(withResult(serverActionAddUserResource), getResult);
export const removeUser = composedResultAction(withResult(serverActionRemoveUser), getResult);

export const retriveUserAttribute = serverActionRetriveUserAttribute;
export const addUserAttribute = composedResultAction(withResult(serverActionAddUserAttribute), getResult);
export const removeUserAttribute = composedResultAction(withResult(serverActionRemoveUserAttribute), getResult);