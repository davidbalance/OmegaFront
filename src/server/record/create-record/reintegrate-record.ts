import { PatientRecord, CompanyRecord, VitalSignsAndAnthropometry, PhysicalRegionalExam, MedicalFitnessForJob, MedicalDiagnostic, GeneralExamResultAndSpecific } from "./_base";


export type ReintegrateRecordPayload = PatientRecord & CompanyRecord &
    VitalSignsAndAnthropometry & GeneralExamResultAndSpecific & PhysicalRegionalExam & GeneralExamResultAndSpecific & MedicalFitnessForJob & {
        /** Institution & Patient Information */
        institutionHealthFacility: string;
        patientAge: number;
        jobPosition: string;
        workingEndDate: Date;
        workingReintegrationDate: Date;
        workingTime: number;
        workingLeftCause: string;

        /** Medical Consultation */
        medicalConsultationDescription: string;

        /** Current disease */
        currentDiseaseDescription: string;

        /** Diagnostics */
        diagnostics: MedicalDiagnostic[];

        /** Medical Recommendations */
        recommendationDescription: string;
    }