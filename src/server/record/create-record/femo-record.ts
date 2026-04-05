import { AuthorSchemaType } from "./base/author.schema";
import { ConsultationSchemaType } from "./femo/consultation.schema";
import { CurrentDiseaseSchemaType } from "./femo/current-disease.schema";
import { DiagnosisSchemaType } from "./femo/diagnosis.schema";
import { EmploymentHistorySchemaType } from "./femo/employement-history.schema";
import { ExamResultSchemaType } from "./femo/exam-results.schema";
import { ExtraLaboralActivitiesSchemaType } from "./femo/extra-laboral-activity.schema";
import { InstitutionSchemaType } from "./femo/institution.schema";
import { MedicalFitnessForWorkSchemaType } from "./femo/medical-fitness-for-work.schema";
import { PersonalHistorySchemaType } from "./femo/personal-history.schema";
import { PhysicalRegionalExamSchemaType } from "./femo/physical-regional-exam.schema";
import { RecommendationSchemaType } from "./femo/recommendation.schema";
import { RetirementSchemaType } from "./femo/retirement.schema";
import { RiskFactorsSchemaType } from "./femo/risk-factor.schema";
import { VitalSignSchemaType } from "./femo/vital-signs.schema";

export type FemoRecordPayload =
    AuthorSchemaType &
    InstitutionSchemaType &
    ConsultationSchemaType &
    PersonalHistorySchemaType &
    CurrentDiseaseSchemaType &
    VitalSignSchemaType &
    PhysicalRegionalExamSchemaType &
    RiskFactorsSchemaType &
    EmploymentHistorySchemaType &
    ExtraLaboralActivitiesSchemaType &
    ExamResultSchemaType &
    DiagnosisSchemaType &
    MedicalFitnessForWorkSchemaType &
    RecommendationSchemaType &
    RetirementSchemaType