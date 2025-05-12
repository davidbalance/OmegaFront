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
import { serverActionRetriveProcesses, serverActionRetriveYears, serverActionRetriveMedicalOrders, serverActionRetriveMedicalOrdersEEQ, serverActionRetriveMedicalOrdersCompany, serverActionRetriveMedicalOrder, serverActionRetriveMedicalOrdersPatient, serverActionRetriveMedicalCloud, serverActionRetriveMedicalChecklist, serverActionRetriveMedicalChecklistFile, serverActionRetriveMedicalOrdersDoctor, serverActionRetriveMedicalOrderMassiveLoadTemplate, serverActionCreateMedicalOrder, serverActionRemoveMedicalOrder, serverActionSendMedicalOrder, serverActionValidatedStatusMedicalOrder, serverActionCreatedStatusMedicalOrder, serverActionMassiveLoadOrder, serverActionProcessOptions, serverActionUpdateMedicalOrderProcess } from "./medical-order/actions";
import { serverActionRetriveMedicalDiseases, serverActionRetriveMedicalDisease, serverActionRetriveMedicalReport, serverActionRetriveMedicalReportFile, serverActionRetriveMedicalResultFile, serverActionRetriveMedicalTests, serverActionRetriveMedicalTest, serverActionRetriveMedicalDiseaseReportFile, serverActionRetriveMedicalTestFileReport, serverActionRetriveMedicalTestFileCount, serverActionCreateMedicalResultDisease, serverActionEditMedicalResultDisease, serverActionRemoveMedicalResultDisease, serverActionAddMedicalReport, serverActionAddMedicalReportFile, serverActionRemoveMedicalReport, serverActionAddMedicalResult, serverActionRemoveMedicalResult, serverActionCheckMedicalTest, serverActionRemoveMedicalTest, serverActionCreateMedicalTest, serverActionUncheckMedicalTest, serverActionCheckMedicalTestFile, serverActionEditMedicalTestExam, serverActionRetriveMedicalTestZip } from "./medical-test/actions";
import { serverActionRetriveClientRecords, serverActionRetriveClientRecordFile, serverActionCreateClientRecordInitial, serverActionCreateClientRecordPeriodic, serverActionCreateClientRecordReintegrate, serverActionCreateClientRecordRetirement, serverActionCreateClientRecordCertificate } from "./record/actions";
import { serverActionRetriveResources, serverActionRetriveResource, serverActionCreateResource, serverActionEditResource, serverActionRemoveResource } from "./resource/actions";
import { serverActionRetriveUserAttribute, serverActionAddUserAttribute, serverActionRemoveUserAttribute } from "./user-attribute/actions";
import { serverActionFindMe, serverActionRetriveUsers, serverActionRetriveUser, serverActionRetriveUserResources, serverActionCreateUser, serverActionEditUser, serverActionAddAuthUser, serverActionAddUserResource, serverActionRemoveUser } from "./user/actions";

const composedResultAction = <P extends any[], B>(f: (...params: P) => Promise<Result<B>>, g: (param: Result<B>) => B) =>
    async (...params: P) => g(await f(...params))

export const retriveApiKeys = serverActionRetriveApiKeys;
export const createApiKey = composedResultAction(serverActionCreateApiKey, getResult);

export const retriveAreas = serverActionRetriveAreas;
export const retriveArea = serverActionRetriveArea;
export const retriveAreaOptions = serverActionRetriveAreaOptions;
export const createArea = composedResultAction(serverActionCreateArea, getResult);
export const editArea = composedResultAction(serverActionEditArea, getResult);
export const removeArea = composedResultAction(serverActionRemoveArea, getResult);

export const retriveBranches = serverActionRetriveBranches;
export const createBranch = composedResultAction(serverActionCreateBranch, getResult);
export const moveBranch = composedResultAction(serverActionMoveBranch, getResult);
export const removeBranch = composedResultAction(serverActionRemoveBranch, getResult);

export const retriveCompanies = serverActionRetriveCompanies;
export const createCompany = composedResultAction(serverActionCreateCompany, getResult);
export const moveCompany = composedResultAction(serverActionMoveCompany, getResult);
export const removeCompany = composedResultAction(serverActionRemoveCompany, getResult);

export const retriveCorporatives = serverActionRetriveCorporatives;
export const retriveCorporativesOptions = serverActionRetriveCorporativesOptions;
export const createCorporative = composedResultAction(serverActionCreateCorporative, getResult);
export const removeCorporative = composedResultAction(serverActionRemoveCorporative, getResult);

export const retriveDiseases = serverActionRetriveDiseases;
export const retriveDisease = serverActionRetriveDisease;
export const createDisease = composedResultAction(serverActionCreateDisease, getResult);
export const editDisease = composedResultAction(serverActionEditDisease, getResult);
export const moveDiseaseToGroup = composedResultAction(serverActionMoveDiseaseToGroup, getResult);
export const removeDisease = composedResultAction(serverActionRemoveDisease, getResult);

export const retriveDiseaseGroups = serverActionRetriveDiseaseGroups;
export const retriveDiseaseGroup = serverActionRetriveDiseaseGroup;
export const retriveDiseaseGroupOptions = serverActionRetriveDiseaseGroupOptions;
export const createDiseaseGroup = composedResultAction(serverActionCreateDiseaseGroup, getResult);
export const editDiseaseGroup = composedResultAction(serverActionEditDiseaseGroup, getResult);
export const removeDiseaseGroup = composedResultAction(serverActionRemoveDiseaseGroup, getResult);

export const retriveDoctors = serverActionRetriveDoctors;
export const retriveDoctor = serverActionRetriveDoctor;
export const retriveDoctorsOptions = serverActionRetriveDoctorsOptions;
export const retriveDoctorFile = serverActionRetriveDoctorFile;
export const uploadDoctorSignature = composedResultAction(serverActionUploadDoctorSignature, getResult);

export const retriveExams = serverActionRetriveExams;
export const retriveExam = serverActionRetriveExam;
export const editExam = composedResultAction(serverActionEditExam, getResult);
export const moveExam = composedResultAction(serverActionMoveExam, getResult);

export const retriveExamSubtypes = serverActionRetriveExamSubtypes;
export const retriveExamSubtype = serverActionRetriveExamSubtype;
export const createExamSubtype = composedResultAction(serverActionCreateExamSubtype, getResult);
export const editExamSubtype = composedResultAction(serverActionEditExamSubtype, getResult);
export const moveExamSubtype = composedResultAction(serverActionMoveExamSubtype, getResult);
export const removeExamSubtype = composedResultAction(serverActionRemoveExamSubtype, getResult);

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
export const createManagement = composedResultAction(serverActionCreateManagement, getResult);
export const editManagement = composedResultAction(serverActionEditManagement, getResult);
export const removeManagement = composedResultAction(serverActionRemoveManagement, getResult);

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
export const createClient = composedResultAction(serverActionCreateClient, getResult);
export const massiveLoadClient = composedResultAction(serverActionMassiveLoadClient, getResult);
export const addAreaClient = composedResultAction(serverActionAddAreaClient, getResult);
export const addJobPositionClient = composedResultAction(serverActionAddJobPositionClient, getResult);
export const addManagementClient = composedResultAction(serverActionAddManagementClient, getResult);
export const changeRoleClient = composedResultAction(serverActionChangeRoleClient, getResult);
export const createClientEmail = composedResultAction(serverActionCreateClientEmail, getResult);
export const defaultClientEmail = composedResultAction(serverActionDefaultClientEmail, getResult);
export const removeClientEmail = composedResultAction(serverActionRemoveClientEmail, getResult);

export const retriveProcessOptions = serverActionProcessOptions;
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
export const createMedicalOrder = composedResultAction(serverActionCreateMedicalOrder, getResult);
export const updateMedicalOrderProcess = composedResultAction(serverActionUpdateMedicalOrderProcess, getResult);
export const removeMedicalOrder = composedResultAction(serverActionRemoveMedicalOrder, getResult);
export const sendMedicalOrder = composedResultAction(serverActionSendMedicalOrder, getResult);
export const validatedStatusMedicalOrder = composedResultAction(serverActionValidatedStatusMedicalOrder, getResult);
export const createdStatusMedicalOrder = composedResultAction(serverActionCreatedStatusMedicalOrder, getResult);
export const massiveLoadOrder = composedResultAction(serverActionMassiveLoadOrder, getResult);

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
export const createMedicalResultDisease = composedResultAction(serverActionCreateMedicalResultDisease, getResult);
export const editMedicalResultDisease = composedResultAction(serverActionEditMedicalResultDisease, getResult);
export const removeMedicalResultDisease = composedResultAction(serverActionRemoveMedicalResultDisease, getResult);
export const addMedicalReport = composedResultAction(serverActionAddMedicalReport, getResult);
export const addMedicalReportFile = composedResultAction(serverActionAddMedicalReportFile, getResult);
export const removeMedicalReport = composedResultAction(serverActionRemoveMedicalReport, getResult);
export const addMedicalResult = composedResultAction(serverActionAddMedicalResult, getResult);
export const removeMedicalResult = composedResultAction(serverActionRemoveMedicalResult, getResult);
export const checkMedicalTest = composedResultAction(serverActionCheckMedicalTest, getResult);
export const removeMedicalTest = composedResultAction(serverActionRemoveMedicalTest, getResult);
export const createMedicalTest = composedResultAction(serverActionCreateMedicalTest, getResult);
export const uncheckMedicalTest = composedResultAction(serverActionUncheckMedicalTest, getResult);
export const checkMedicalTestFile = composedResultAction(serverActionCheckMedicalTestFile, getResult);
export const editMedicalTestExam = composedResultAction(serverActionEditMedicalTestExam, getResult);
export const retriveMedicalTestZip = composedResultAction(serverActionRetriveMedicalTestZip, getResult);

export const retriveClientRecords = serverActionRetriveClientRecords;
export const retriveClientRecordFile = serverActionRetriveClientRecordFile;
export const createClientRecordInitial = composedResultAction(serverActionCreateClientRecordInitial, getResult);
export const createClientRecordPeriodic = composedResultAction(serverActionCreateClientRecordPeriodic, getResult);
export const createClientRecordReintegrate = composedResultAction(serverActionCreateClientRecordReintegrate, getResult);
export const createClientRecordRetirement = composedResultAction(serverActionCreateClientRecordRetirement, getResult);
export const createClientRecordCertificate = composedResultAction(serverActionCreateClientRecordCertificate, getResult);

export const retriveResources = serverActionRetriveResources;
export const retriveResource = serverActionRetriveResource;
export const createResource = composedResultAction(serverActionCreateResource, getResult);
export const editResource = composedResultAction(serverActionEditResource, getResult);
export const removeResource = composedResultAction(serverActionRemoveResource, getResult);

export const findMe = serverActionFindMe;
export const retriveUsers = serverActionRetriveUsers;
export const retriveUser = serverActionRetriveUser;
export const retriveUserResources = serverActionRetriveUserResources;
export const createUser = composedResultAction(serverActionCreateUser, getResult);
export const editUser = composedResultAction(serverActionEditUser, getResult);
export const addAuthUser = composedResultAction(serverActionAddAuthUser, getResult);
export const addUserResource = composedResultAction(serverActionAddUserResource, getResult);
export const removeUser = composedResultAction(serverActionRemoveUser, getResult);

export const retriveUserAttribute = serverActionRetriveUserAttribute;
export const addUserAttribute = composedResultAction(serverActionAddUserAttribute, getResult);
export const removeUserAttribute = composedResultAction(serverActionRemoveUserAttribute, getResult);