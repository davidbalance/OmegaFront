import {
    AccessControlEndpoint,
    AuthenticationEndpoint,
    BranchEndpoint,
    CityEndpoint,
    CompanyEndpoint,
    CorporativeGroupEndpoint,
    CredentialEndpoint,
    DiseaseEndpoint,
    DiseaseGroupEndpoint,
    DoctorEndpoint,
    ExamEndpoint,
    MedicalReportEndpoint,
    OmegaWebClientEndpoint,
    OrderEndpoint,
    PatientEndpoint,
    ResourceEndpoint,
    ResultEndpoint,
    RoleEndpoint,
    UserEndpoint
} from "./v1";
import { ApiKeyEndpoint } from "./v1/api-key.endpoint";

export default Object.freeze({
    API_KEY: {
        V1: ApiKeyEndpoint
    },
    ACCESS_CONTROL: {
        V1: AccessControlEndpoint
    },
    AUTHENTICATION: {
        V1: AuthenticationEndpoint
    },
    BRANCH: {
        V1: BranchEndpoint
    },
    CITY: {
        V1: CityEndpoint
    },
    COMPANY: {
        V1: CompanyEndpoint
    },
    CORPORATIVE_GROUP: {
        V1: CorporativeGroupEndpoint
    },
    CREDENTIAL: {
        V1: CredentialEndpoint
    },
    DISEASE_GROUP: {
        V1: DiseaseGroupEndpoint
    },
    DISEASE: {
        V1: DiseaseEndpoint
    },
    DOCTOR: {
        V1: DoctorEndpoint
    },
    EXAM: {
        V1: ExamEndpoint
    },
    MEDICAL_REPORT: {
        V1: MedicalReportEndpoint
    },
    OMEGA_WEB_CLIENT: {
        V1: OmegaWebClientEndpoint
    },
    ORDER: {
        V1: OrderEndpoint
    },
    PATIENT: {
        V1: PatientEndpoint
    },
    RESOURCE: {
        V1: ResourceEndpoint
    },
    MEDICAL_RESULT: {
        V1: ResultEndpoint
    },
    ROLE: {
        V1: RoleEndpoint
    },
    USER: {
        V1: UserEndpoint
    }
});