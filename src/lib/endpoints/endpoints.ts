import { API_KEY } from "./v1/api/key";
import { AUTH } from "./v1/authentication/auth";
import { CREDENTIAL } from "./v1/authentication/credential";
import { DISEASE } from "./v1/disease";
import { DISEASE_GROUP } from "./v1/disease/group";
import { FILE_RESULT } from "./v1/file/result";
import { HEALTH_CHECK } from "./v1/health/check";
import { BRANCH } from "./v1/location/branch";
import { CITY } from "./v1/location/city";
import { COMPANY } from "./v1/location/company";
import { CORPORATIVE_GROUP } from "./v1/location/corporative/group";
import { LOG } from "./v1/log";
import { MAIL_ORDER } from "./v1/mail/order";
import { MEDICAL_ORDER } from "./v1/medical/order";
import { MEDICAL_RESULT } from "./v1/medical/result";
import { BRANCH_SELECTOR } from "./v1/selector/branch";
import { CITY_SELECTOR } from "./v1/selector/city";
import { COMPANY_SELECTOR } from "./v1/selector/company";
import { CORPORATIVE_GROUP_SELECTOR } from "./v1/selector/corporative/group";
import { DISEASE_SELECTOR } from "./v1/selector/disease";
import { GROUP_SELECTOR } from "./v1/selector/disease/group";
import { EXAM_SELECTOR } from "./v1/selector/exam";
import { DOCTOR } from "./v1/user/doctor";
import { PATIENT } from "./v1/user/patient";
import { USER } from "./v1/user/user";
import { WEB_CLIENT } from "./v1/web/client";
import { WEB_RESOURCE } from "./v1/web/resource";

export default Object.freeze({
    LOGGER: LOG,
    DISEASE: {
        DISEASE,
        GROUP: DISEASE_GROUP
    },
    LOCATION: {
        CITY,
        COMPANY,
        CORPORATIVE_GROUP,
        BRANCH
    },
    USER: {
        USER,
        PATIENT,
        DOCTOR
    },
    AUTHENTICATION: {
        AUTH,
        CREDENTIAL
    },
    API_KEY,
    WEB: {
        RESOURCE: WEB_RESOURCE,
        CLIENT: WEB_CLIENT
    },
    MEDICAL: {
        ORDER: MEDICAL_ORDER,
        RESULT: MEDICAL_RESULT
    },
    HEALTH_CHECK,
    MAIL: {
        ORDER: MAIL_ORDER
    },
    FILE: {
        RESULT: FILE_RESULT
    },
    SELECTOR: {
        DISEASE: DISEASE_SELECTOR,
        DISEASE_GROUP: GROUP_SELECTOR,
        LOCATION: {
            CITY: CITY_SELECTOR,
            COMPANY: COMPANY_SELECTOR,
            CORPORATIVE_GROUP: CORPORATIVE_GROUP_SELECTOR,
            BRANCH: BRANCH_SELECTOR
        },
        EXAM: EXAM_SELECTOR
    }
});