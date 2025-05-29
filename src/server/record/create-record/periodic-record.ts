import {
    PhysicalRisk,
    MechanicalRisk,
    ChemicalRisk,
    BiologicalRisk,
    ErgonomicRisk,
    PsychosocialRisk,
    PatientRecord,
    CompanyRecord,
    LifeStyle,
    JobAccident,
    OccupationalDisease,
    FamilyHistory,
    ReviewOfOrgansAndSystem,
    VitalSignsAndAnthropometry,
    PhysicalRegionalExam,
    MedicalFitnessForJob,
    ToxicDetail,
    MedicalDiagnostic,
    MedicalConsultation,
    MedicalAndSurgicalHistory,
    RecordRecommendation,
    CurrentDisease,
    GeneralExamResultAndSpecific,
    InstitutionHealthRecord,
    IncidentRecord
} from "./_base";

export type JobRisk = Partial<PhysicalRisk<boolean>>
    & Partial<MechanicalRisk<Boolean>>
    & Partial<ChemicalRisk<boolean>>
    & Partial<BiologicalRisk<boolean>>
    & Partial<ErgonomicRisk<boolean>>
    & Partial<PsychosocialRisk<boolean>>
    & {
        name: string;
        activity: string;
        months: number;
        physicalRiskOther?: boolean;
        mechanicRiskOther?: boolean;
        chemicalRiskOther?: boolean;
        biologicalRiskOther?: boolean;
        ergonomicRiskOther?: boolean;
        psychosocialRiskOther?: boolean;
        preventiveMeasure: string;
    }

export type PeriodicRecordPayload =
    // Institution & Patient Information
    & InstitutionHealthRecord
    & CompanyRecord
    & PatientRecord
    // Medical Consultation
    & MedicalConsultation
    // Patient History
    & MedicalAndSurgicalHistory
    & LifeStyle
    & IncidentRecord
    & JobAccident
    & OccupationalDisease
    // Family history
    & FamilyHistory
    // Current Disease
    & CurrentDisease
    // Review of Organs and System
    & ReviewOfOrgansAndSystem
    // Vital Signs and Anthropometry
    & VitalSignsAndAnthropometry
    // Physical Regional Exam
    & PhysicalRegionalExam
    // General Exam Result and Specific
    & GeneralExamResultAndSpecific
    // Medical Fitness for Job
    & MedicalFitnessForJob
    // Record Recommendation
    & RecordRecommendation
    & {
        /* ---------------------------- Institution & Patient Information ---------------------------- */
        jobPosition: string;

        /* ---------------------------- Patient History ---------------------------- */
        toxicHabitTobacco: ToxicDetail;
        toxicHabitAlcohol: ToxicDetail;
        toxicHabitOther: ToxicDetail;

        /* ---------------------------- Job Position Risks ---------------------------- */
        jobRisks: JobRisk[];

        /* ---------------------------- Diagnostics ---------------------------- */
        diagnostics: MedicalDiagnostic[];
    }