import { PatientRecord, CompanyRecord, VitalSignsAndAnthropometry, PhysicalRegionalExam, MedicalFitnessForJob, MedicalDiagnostic, GeneralExamResultAndSpecific } from "./_base";

type ExamResult = {
    exam: string;
    date: Date;
    result: string;
}

export type ReintegrateRecordPayload = PatientRecord & CompanyRecord &
    VitalSignsAndAnthropometry & GeneralExamResultAndSpecific & PhysicalRegionalExam & MedicalFitnessForJob & {
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

        /** ExamResults */
        examResults: ExamResult[];

        /** Diagnostics */
        diagnostics: MedicalDiagnostic[];

        /** Medical Recommendations */
        recommendationDescription: string;
    }