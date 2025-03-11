import { PhysicalRisk, MechanicalRisk, ChemicalRisk, BiologicalRisk, ErgonomicRisk, PsychosocialRisk, PatientRecord, CompanyRecord, LifeStyle, JobAccident, GeneralExam, OccupationalDisease, FamilyHistory, ReviewOfOrgansAndSystem, VitalSignsAndAnthropometry, PhysicalRegionalExam, MedicalFitnessForJob, ToxicDetail, MedicalDiagnostic } from "./_base";

type JobRisk = Partial<PhysicalRisk<boolean>> & Partial<MechanicalRisk<Boolean>> & Partial<ChemicalRisk<boolean>> & Partial<BiologicalRisk<boolean>> & Partial<ErgonomicRisk<boolean>> & {
    name: string;
    activity: string;
    months: number;
    physicalRiskOther?: string;
    mechanicRiskOther?: string;
    chemicalRiskOther?: string;
    biologicalRiskOther?: string;
    ergonomicRiskOther?: string;
}

type JobRiskWithPreventiveMeasure = Partial<PsychosocialRisk<boolean>> & {
    name: string;
    activity: string;
    months: number;
    psychosocialRiskOther?: string;
    preventiveMeasure: string;
}

export type PeriodicRecordPayload = CompanyRecord & PatientRecord & LifeStyle &
    JobAccident & OccupationalDisease & GeneralExam & FamilyHistory & ReviewOfOrgansAndSystem & VitalSignsAndAnthropometry &
    PhysicalRegionalExam & MedicalFitnessForJob & {
        /** Institution & Patient Information */
        institutionHealthFacility: string;
        jobPosition: string;

        /** Medical Consultation */
        medicalConsultationDescription: string;

        /** Patient History */
        medicalAndSurgicalHistory: string;
        toxicHabitTobacco?: ToxicDetail;
        toxicHabitAlcohol?: ToxicDetail;
        toxicHabitOther?: ToxicDetail;
        incidentDescription: string;

        /** Job Position Risks */
        jobRisks: JobRisk[];
        jobRiskWithPreventiveMeasure: JobRiskWithPreventiveMeasure[];

        /** Extra Activities & Diseases */
        currentDiseaseDescription: string;

        /** Diagnostics */
        diagnostics: MedicalDiagnostic[];

        /** Medical Recommendations */
        recommendationDescription: string;
    }