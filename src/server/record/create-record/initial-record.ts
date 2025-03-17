import { PhysicalRisk, MechanicalRisk, ChemicalRisk, BiologicalRisk, ErgonomicRisk, PsychosocialRisk, PatientRecord, CompanyRecord, LifeStyle, JobAccident, OccupationalDisease, FamilyHistory, ReviewOfOrgansAndSystem, VitalSignsAndAnthropometry, PhysicalRegionalExam, MedicalFitnessForJob, ToxicDetail, MedicalDiagnostic, GeneralExamResult, MedicalConsultation, MedicalAndSurgicalHistory, ExtraActivity, CurrentDisease, GeneralExamResultAndSpecific, RecordRecommendation } from "./_base";

type Religion = 'catholic' | 'evangelical' | "jehovah's witnesses" | 'mormon' | 'other';
type SexualOrientation = 'lesbian' | 'gay' | 'bisexual' | 'heterosexual' | 'unknown';
type GenderIdentity = 'male' | 'female' | 'trans-female' | 'trans-male' | 'unknown';

type ExamHistoryResult = {
    done: boolean;
    time?: number;
    result?: string;
};

type GynecologicalHistory = {
    gynecologicalMenarche: string;
    gynecologicalCycle: string;
    gynecologicalLastMenstruationDate: Date;
    gynecologicalDeeds: number;
    gynecologicalBirths: number;
    gynecologicalCesarean: number;
    gynecologicalAbortions: number;
    gynecologicalDeadChildren: number;
    gynecologicalLivingChildren: number;
    gynecologicalSexualLife: boolean;
    gynecologicalFamilyPlanningType?: string;
    gynecologicalExamPapanicolau: ExamHistoryResult;
    gynecologicalExamColposcopy: ExamHistoryResult;
    gynecologicalExamBreastEcho: ExamHistoryResult;
    gynecologicalExamMammography: ExamHistoryResult;
};

type MaleReproductiveHistory = {
    maleReproductiveExamProstateAntigen: ExamHistoryResult;
    maleReproductiveExamProstateEcho: ExamHistoryResult;
    maleReproductiveFamilyPlanningType?: string;
    maleReproductiveDeadChildren: number;
    maleReproductiveLivingChildren: number;
};

type JobInformation = {
    jobStartDate: Date;
    jobPosition: string;
    jobArea: string;
    jobActivity: string;
};

type JobHistory = {
    lastJobCompany: string;
    lastJobPosition: string;
    lastJobActivity: string;
    lastJobTime: number;
    lastJobRiskPhysical: boolean;
    lastJobRiskMechanical: boolean;
    lastJobRiskChemical: boolean;
    lastJobRiskBiological: boolean;
    lastJobRiskErgonomic: boolean;
    lastJobRiskPsychosocial: boolean;
    lastJobObservation: string;
}

export type JobRisk = Partial<PhysicalRisk<boolean>> & Partial<MechanicalRisk<boolean>> & Partial<ChemicalRisk<boolean>> & {
    name: string;
    activity: string;
    physicalRiskOther?: string;
    mechanicRiskOther?: string;
    chemicalRiskOther?: string;
}

export type JobRiskWithPreventiveMeasure = Partial<BiologicalRisk<boolean>> & Partial<ErgonomicRisk<boolean>> & Partial<PsychosocialRisk<boolean>> & {
    name: string;
    activity: string;
    biologicalRiskOther?: string;
    ergonomicRiskOther?: string;
    psychosocialRiskOther?: string;
    preventiveMeasure: string;
}

export type InitialRecordPayload = PatientRecord & CompanyRecord & MedicalConsultation & MedicalAndSurgicalHistory &
    JobInformation & LifeStyle & JobAccident & OccupationalDisease &
    FamilyHistory & GynecologicalHistory & MaleReproductiveHistory & ReviewOfOrgansAndSystem &
    VitalSignsAndAnthropometry & PhysicalRegionalExam & ExtraActivity & CurrentDisease & GeneralExamResultAndSpecific & MedicalFitnessForJob &
    RecordRecommendation & {
        /** Institution & Patient Information */
        institutionHealthFacility: string;
        patientAge: number;
        patientReligion: Religion;
        patientOtherReligion?: string;
        patientBloodType: string;
        patientLaterality: string;
        patientSexualOrientation: SexualOrientation;
        patientGenderIdentity: GenderIdentity;
        patientDisabilityType?: string;
        patientDisabilityPercent?: number;

        /** Patient History */
        toxicHabitTobacco?: ToxicDetail;
        toxicHabitAlcohol?: ToxicDetail;
        toxicHabitOther?: ToxicDetail;

        /** Job Position History */
        jobHistory: JobHistory[];
        jobRisks: JobRisk[];
        jobRiskWithPreventiveMeasure: JobRiskWithPreventiveMeasure[];

        /** Diagnostics */
        diagnostics: MedicalDiagnostic[];
    };
