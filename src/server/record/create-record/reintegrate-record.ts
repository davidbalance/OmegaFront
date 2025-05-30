import { PatientRecord, CompanyRecord, VitalSignsAndAnthropometry, PhysicalRegionalExam, MedicalFitnessForJob, MedicalDiagnostic, GeneralExamResultAndSpecific, RecordRecommendation, CurrentDisease, MedicalConsultation, InstitutionHealthRecord, RecordLogoFlag } from "./_base";


export type ReintegrateRecordPayload =
    RecordLogoFlag
    // Institution & Patient Information
    & InstitutionHealthRecord
    & CompanyRecord
    & PatientRecord
    // Medical Consultation
    & MedicalConsultation
    // Current Disease
    & CurrentDisease
    // Vital Signs and Anthropometry
    & VitalSignsAndAnthropometry
    // Physical Regional Exam
    & PhysicalRegionalExam
    // General Exam Result and Specific
    & GeneralExamResultAndSpecific
    // Medical Fitness for Job
    & MedicalFitnessForJob
    // Recommendation
    & RecordRecommendation
    & {
        /* ------------------------------------------- Institution & Patient Information ------------------------------------------- */
        patientAge: number;
        jobPosition: string;
        workingEndDate: Date;
        workingReintegrationDate: Date;
        workingTime: number;
        workingLeftCause: string;

        /* ------------------------------------------- Diagnostics ------------------------------------------- */
        diagnostics: MedicalDiagnostic[];
    }