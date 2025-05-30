import { PatientRecord, CompanyRecord, VitalSignsAndAnthropometry, PhysicalRegionalExam, MedicalDiagnostic, JobAccident, OccupationalDisease, GeneralExamResultAndSpecific, InstitutionHealthRecord, MedicalAndSurgicalHistory, RecordRecommendation, RecordLogoFlag } from "./_base";

export type RetirementInstitutionActivity = {
    activity: string;
    risk: string;
}

export type RetirementEvaluation = {
    retirementEvaluationDone: boolean;
    retirementEvaluationObservation?: string;
}

export type RetirementRecordPayload =
    RecordLogoFlag
    // Institution & Patient Information
    & InstitutionHealthRecord
    & CompanyRecord
    & PatientRecord
    // Patient history
    & MedicalAndSurgicalHistory
    & JobAccident
    & OccupationalDisease
    // Vital Signs and Anthropometry
    & VitalSignsAndAnthropometry
    // Physical Regional Exam
    & PhysicalRegionalExam
    // General Exam Result and Specific
    & GeneralExamResultAndSpecific
    // Retirement Evaluation
    & RetirementEvaluation
    // Recommendation
    & RecordRecommendation
    & {
        /* --------------------------------------------------- Institution & Patient Information --------------------------------------------------- */
        institutionActivities: RetirementInstitutionActivity[];
        workStartDate: Date;
        workingTime: number;
        workingEndDate: Date;
        jobPosition: string;

        /* --------------------------------------------------- Medical Consultation --------------------------------------------------- */
        medicalAndSurgicalHistory: string;

        /* --------------------------------------------------- Diagnostics --------------------------------------------------- */
        diagnostics: MedicalDiagnostic[];

        /* --------------------------------------------------- Medical Recommendations --------------------------------------------------- */
        recommendationDescription: string;
    }