import { PatientRecord, CompanyRecord, MedicalDiagnostic, MedicalFitnessForJob } from "./_base";

type GeneralData = {
    generalDataEntry: boolean;
    generalDataPeriodic: boolean;
    generalDataReintegrate: boolean;
    generalDataRetirement: boolean;
};

type RetirementEvaluation = {
    retirementEvaluationDone: boolean;
    retirementEvaluationCondition: 'presuntive' | 'definitive' | 'no-apply';
    retirementEvaluationConditionWithJob: 'yes' | 'no' | 'no-apply';
}

export type RetirementRecordPayload = PatientRecord & CompanyRecord &
    GeneralData & MedicalFitnessForJob & RetirementEvaluation & {
        /** Institution & Patient Information */
        institutionHealthFacility: string;
        jobPosition: string;

        /** Medical Consultation */
        medicalAndSurgicalHistory: string;

        /** Diagnostics */
        diagnostics: MedicalDiagnostic[];

        /** Medical Recommendations */
        recommendationDescription: string;
    }