import { AuthorSchemaType } from "./base/author.schema";
import { GeneralDataSchemaType } from "./certificate/general-data.schema";
import { InstitutionSchemaType } from "./certificate/institution.schema";
import { MedicalFitnessForWorkSchemaType } from "./certificate/medical-fitness-for-work.schema";
import { RecommendationSchemaType } from "./certificate/recommendation.schema";

export type CertificateRecordPayload =
    AuthorSchemaType &
    InstitutionSchemaType &
    GeneralDataSchemaType &
    MedicalFitnessForWorkSchemaType &
    RecommendationSchemaType