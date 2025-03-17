import { PatientRecord, CompanyRecord, VitalSignsAndAnthropometry, PhysicalRegionalExam, MedicalDiagnostic, JobAccident, OccupationalDisease, GeneralExamResultAndSpecific } from "./_base";

type InstitutionActivity = {
    activity: string;
    risk: string;
}

type RetirementEvaluation = {
    retirementDone: boolean;
    retirementObservation: string;
}

export type RetirementRecordPayload = PatientRecord & CompanyRecord &
    JobAccident & OccupationalDisease & GeneralExamResultAndSpecific & VitalSignsAndAnthropometry & PhysicalRegionalExam &
    RetirementEvaluation & {
        /** Institution & Patient Information */
        institutionHealthFacility: string;
        institutionActivities: InstitutionActivity[];
        workStartDate: Date;
        workingTime: number;
        workingEndDate: Date;
        jobPosition: string;

        /** Medical Consultation */
        medicalAndSurgicalHistory: string;

        /** Diagnostics */
        diagnostics: MedicalDiagnostic[];

        /** Medical Recommendations */
        recommendationDescription: string;
    }