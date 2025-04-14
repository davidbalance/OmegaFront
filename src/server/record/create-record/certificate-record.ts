import { PatientRecord, CompanyRecord, MedicalFitnessForJob, RecordRecommendation } from "./_base";

type GeneralData = {
    generalData: 'entry' | 'periodic' | 'reintegrate' | 'retirement'
};

type RetirementEvaluation = {
    retirementEvaluationDone: boolean;
    retirementEvaluationCondition: 'presuntive' | 'definitive' | 'no-apply';
    retirementEvaluationConditionWithJob: 'yes' | 'no' | 'no-apply';
}

export type CertificateRecordPayload = PatientRecord & CompanyRecord &
    GeneralData & MedicalFitnessForJob & RetirementEvaluation &
    RecordRecommendation & {
        /** Institution & Patient Information */
        institutionHealthFacility: string;
        jobPosition: string;
    }