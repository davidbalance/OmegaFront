import { PatientRecord, CompanyRecord, VitalSignsAndAnthropometry, PhysicalRegionalExam, MedicalFitnessForJob, MedicalDiagnostic, GeneralExamResultAndSpecific, RecordRecommendation, CurrentDisease, MedicalConsultation } from "./_base";


export type ReintegrateRecordPayload = PatientRecord & CompanyRecord & MedicalConsultation &
    VitalSignsAndAnthropometry & PhysicalRegionalExam & GeneralExamResultAndSpecific & MedicalFitnessForJob &
    CurrentDisease & RecordRecommendation & {
        /** Institution & Patient Information */
        institutionHealthFacility: string;
        patientAge: number;
        jobPosition: string;
        workingEndDate: Date;
        workingReintegrationDate: Date;
        workingTime: number;
        workingLeftCause: string;

        /** Diagnostics */
        diagnostics: MedicalDiagnostic[];
    }