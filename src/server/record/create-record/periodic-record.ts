import { PhysicalRisk, MechanicalRisk, ChemicalRisk, BiologicalRisk, ErgonomicRisk, PsychosocialRisk, PatientRecord, CompanyRecord, LifeStyle, JobAccident, OccupationalDisease, FamilyHistory, ReviewOfOrgansAndSystem, VitalSignsAndAnthropometry, PhysicalRegionalExam, MedicalFitnessForJob, ToxicDetail, MedicalDiagnostic, MedicalConsultation, MedicalAndSurgicalHistory, RecordRecommendation, CurrentDisease, IndentRecord } from "./_base";

export type JobRisk = Partial<PhysicalRisk<boolean>> & Partial<MechanicalRisk<Boolean>> & Partial<ChemicalRisk<boolean>> & Partial<BiologicalRisk<boolean>> & Partial<ErgonomicRisk<boolean>> & {
    name: string;
    activity: string;
    months: number;
    physicalRiskOther?: string;
    mechanicRiskOther?: string;
    chemicalRiskOther?: string;
    biologicalRiskOther?: string;
    ergonomicRiskOther?: string;
}

export type JobRiskWithPreventiveMeasure = Partial<PsychosocialRisk<boolean>> & {
    name: string;
    activity: string;
    months: number;
    psychosocialRiskOther?: string;
    preventiveMeasure: string;
}

export type PeriodicRecordPayload = PatientRecord & CompanyRecord & MedicalConsultation & MedicalAndSurgicalHistory & LifeStyle &
    JobAccident & OccupationalDisease & FamilyHistory & IndentRecord & ReviewOfOrgansAndSystem & VitalSignsAndAnthropometry &
    PhysicalRegionalExam & CurrentDisease & MedicalFitnessForJob & RecordRecommendation & {
        /** Institution & Patient Information */
        institutionHealthFacility: string;
        jobPosition: string;

        /** Patient History */
        toxicHabitTobacco?: ToxicDetail;
        toxicHabitAlcohol?: ToxicDetail;
        toxicHabitOther?: ToxicDetail;

        /** Job Position Risks */
        jobRisks: JobRisk[];
        jobRiskWithPreventiveMeasure: JobRiskWithPreventiveMeasure[];

        /** Diagnostics */
        diagnostics: MedicalDiagnostic[];
    }