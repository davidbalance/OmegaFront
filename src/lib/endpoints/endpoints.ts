import { API_KEY } from "./v1/authentication/api/key";
import { AUTH } from "./v1/authentication/auth";
import { CREDENTIAL } from "./v1/authentication/credential";
import { DISEASE } from "./v1/disease";
import { DISEASE_GROUP } from "./v1/disease/group";
import { HEALTH_CHECK } from "./v1/health/check";
import { AREA } from "./v1/location/area";
import { CORPORATIVE_GROUP } from "./v1/location/corporative/group";
import { JOB_POSITION } from "./v1/location/job/position";
import { MANAGEMENT } from "./v1/location/management";
import { LOG } from "./v1/log";
import { MEDICAL_CLIENT } from "./v1/medical/client";
import { MEDICAL_FILE } from "./v1/medical/file";
import { MEDICAL_ORDER } from "./v1/medical/order";
import { MEDICAL_REPORT } from "./v1/medical/report";
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
import { WEB_CLIENT } from "./v1/omega/web/client";
import { WEB_RESOURCE } from "./v1/omega/web/resource";
import { NAV_RESOURCE } from "./v1/omega/nav/resource";
import { LAB_EXAM_SUBTYPE } from "./v1/laboratory/exam/subtype";
import { LAB_EXAM_TYPE } from "./v1/laboratory/exam/type";
import { LAB_EXAM } from "./v1/laboratory/exam";

export default Object.freeze({
    LOGGER: LOG,
    DISEASE: {
        DISEASE,
        GROUP: DISEASE_GROUP
    },
    LOCATION: {
        CORPORATIVE_GROUP,
        MANAGEMENT,
        JOB_POSITION,
        AREA
    },
    USER: {
        USER,
        PATIENT,
        DOCTOR
    },
    AUTHENTICATION: {
        AUTH,
        CREDENTIAL,
        API_KEY
    },
    OMEGA: {
        WEB: {
            RESOURCE: WEB_RESOURCE,
            CLIENT: WEB_CLIENT
        },
        NAV: {
            RESOURCE: NAV_RESOURCE
        }
    },
    LABORATORY: {
        EXAM: {
            ...LAB_EXAM,
            TYPE: LAB_EXAM_TYPE,
            SUBTYPE: LAB_EXAM_SUBTYPE,
        }
    },
    MEDICAL: {
        ORDER: MEDICAL_ORDER,
        RESULT: MEDICAL_RESULT,
        CLIENT: MEDICAL_CLIENT,
        REPORT: MEDICAL_REPORT
    },
    HEALTH_CHECK,
    FILE: {
        RESULT: MEDICAL_FILE
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