import { PhysicalRisk, MechanicalRisk, ChemicalRisk, BiologicalRisk, ErgonomicRisk, PsychosocialRisk, PatientRecord, CompanyRecord, LifeStyle, JobAccident, GeneralExam, OccupationalDisease, FamilyHistory, ReviewOfOrgansAndSystem, VitalSignsAndAnthropometry, PhysicalRegionalExam, MedicalFitnessForJob, ToxicDetail, MedicalDiagnostic } from "./_base";

type Religion = 'catholic' | 'evangelical' | "jehovah's witnesses" | 'mormon' | 'other';
type SexualOrientation = 'lesbian' | 'gay' | 'bisexual' | 'heterosexual' | 'other';
type GenderIdentity = 'male' | 'female' | 'trans-female' | 'trans-male' | 'other';

type ExamHistoryResult = {
    done: boolean;
    time: number;
    result: string;
};

type GynecologicalHistory = {
    gynecologicalMenarche: string;
    gynecologicalCycle: string;
    gynecologicalLastMenstruationDate: Date;
    gynecologicalDeeds: string;
    gynecologicalBirths: string;
    gynecologicalCesarean: string;
    gynecologicalAbortions: string;
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
};

type JobInformation = {
    jobStartDate: Date;
    jobPosition: string;
    jobArea: string;
    jobActivity: string;
}

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

type JobRisk = Partial<PhysicalRisk<boolean>> & Partial<MechanicalRisk<boolean>> & Partial<ChemicalRisk<boolean>> & {
    name: string;
    activity: string;
    physicalRiskOther?: string;
    mechanicRiskOther?: string;
    chemicalOther?: string;
}

type JobRiskWithPreventiveMeasure = Partial<BiologicalRisk<boolean>> & Partial<ErgonomicRisk<boolean>> & Partial<PsychosocialRisk<boolean>> & {
    name: string;
    activity: string;
    biologicalRiskOther?: string;
    ergonomicOther?: string;
    phychosocialOther?: string;
    preventiveMeasure: string;
}

export type InitialRecordPayload = PatientRecord & CompanyRecord &
    JobInformation & LifeStyle & JobAccident & GeneralExam & OccupationalDisease &
    FamilyHistory & GynecologicalHistory & MaleReproductiveHistory & ReviewOfOrgansAndSystem &
    VitalSignsAndAnthropometry & PhysicalRegionalExam & MedicalFitnessForJob & {
        /** Institution & Patient Information */
        institutionHealthFacility: string;
        patientAge: number;
        patientReligion: Religion;
        patientOtherReligion?: string;
        patientBloodType: string;
        patientLaterality: string;
        patientSexualOrientation: SexualOrientation;
        patientOtherSexualOrientation?: string;
        patientGenderIdentity: GenderIdentity;
        patientOtherGenderIdentity?: string;
        patientDisabilityType?: string;
        patientDisabilityPercent?: number;

        /** Medical Consultation */
        medicalConsultationDescription: string;

        /** Patient History */
        medicalAndSurgicalHistory: string;
        toxicHabitTobacco?: ToxicDetail;
        toxicHabitAlcohol?: ToxicDetail;
        toxicHabitOther?: ToxicDetail;

        /** Job Position History */
        jobHistory: JobHistory[];
        jobRisks: JobRisk[];
        jobRiskWithPreventiveMeasure: JobRiskWithPreventiveMeasure[];

        /** Extra Activities & Diseases */
        extraActivityDescription: string;
        currentDiseaseDescription: string;

        /** Diagnostics */
        diagnostics: MedicalDiagnostic[];

        /** Medical Recommendations */
        recommendationDescription: string;
    };
