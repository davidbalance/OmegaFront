import { PhysicalRisk, MechanicalRisk, ChemicalRisk, BiologicalRisk, ErgonomicRisk, PsychosocialRisk, PatientRecord, CompanyRecord, LifeStyle, JobAccident, OccupationalDisease, FamilyHistory, ReviewOfOrgansAndSystem, VitalSignsAndAnthropometry, PhysicalRegionalExam, MedicalFitnessForJob, ToxicDetail, MedicalDiagnostic, GeneralExamResult, MedicalConsultation, MedicalAndSurgicalHistory, ExtraActivity, CurrentDisease, GeneralExamResultAndSpecific, RecordRecommendation, InstitutionHealthRecord, RecordLogoFlag, RecordAuthor } from "./_base";

type ReligionRecord = 'catholic' | 'evangelical' | "jehovah's witnesses" | 'mormon' | 'other';
type SexualOrientation = 'lesbian' | 'gay' | 'bisexual' | 'heterosexual' | 'unknown';
type GenderIdentity = 'male' | 'female' | 'trans-female' | 'trans-male' | 'unknown';
type PatientLaterality = 'right' | 'left';

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

type JobHistory = {
    jobHistoryCompany: string;
    jobHistoryPosition: string;
    jobHistoryActivity: string;
    jobHistoryTime: number;
    jobHistoryRiskPhysical: boolean;
    jobHistoryRiskMechanical: boolean;
    jobHistoryRiskChemical: boolean;
    jobHistoryRiskBiological: boolean;
    jobHistoryRiskErgonomic: boolean;
    jobHistoryRiskPsychosocial: boolean;
    jobHistoryObservation: string;
}

export type JobRisk = Partial<PhysicalRisk<boolean>>
    & Partial<MechanicalRisk<boolean>>
    & Partial<ChemicalRisk<boolean>>
    & Partial<BiologicalRisk<boolean>>
    & Partial<ErgonomicRisk<boolean>>
    & Partial<PsychosocialRisk<boolean>>
    & {
        name: string;
        activity: string;
        physicalRiskOther?: boolean;
        mechanicRiskOther?: boolean;
        chemicalRiskOther?: boolean;
        biologicalRiskOther?: boolean;
        ergonomicRiskOther?: boolean;
        psychosocialRiskOther?: boolean;
        preventiveMeasure: string;
    }

type InstitutionJobInformation = {
    institutionJobStartDate: Date;
    institutionJobPosition: string;
    institutionJobArea: string;
    institutionJobActivities: string;
}

export type InitialRecordPayload =
    RecordAuthor
    & RecordLogoFlag
    // ---------------------------- Institution & Patient Information
    & CompanyRecord
    & InstitutionHealthRecord
    & PatientRecord
    & InstitutionJobInformation
    // ---------------------------- Medical Consultation
    & MedicalConsultation
    // ---------------------------- Patient History
    & MedicalAndSurgicalHistory
    & GynecologicalHistory
    & MaleReproductiveHistory
    & LifeStyle
    // ---------------------------- Job history
    & JobAccident
    & OccupationalDisease
    // ---------------------------- Family history
    & FamilyHistory
    // ---------------------------- Job Extra Activities
    & ExtraActivity
    // ---------------------------- Current disease
    & CurrentDisease
    // ---------------------------- Review of Organs and System
    & ReviewOfOrgansAndSystem
    // ---------------------------- Vital Signs and Anthropometry
    & VitalSignsAndAnthropometry
    // ---------------------------- Physical Regional Exam
    & PhysicalRegionalExam
    // ---------------------------- General Exam Result and Specific
    & GeneralExamResultAndSpecific
    // ---------------------------- Medical Fitness for Job
    & MedicalFitnessForJob
    // ---------------------------- Recommendation
    & RecordRecommendation
    & {
        /* ---------------------------- Institution & Patient Information ---------------------------- */
        patientAge: number;
        patientReligion: ReligionRecord;
        patientBloodType: string;
        patientLaterality: PatientLaterality;
        patientSexualOrientation: SexualOrientation;
        patientGenderIdentity: GenderIdentity;
        patientDisabilityType?: string;
        patientDisabilityPercent?: number;

        /* ---------------------------- Patient History ---------------------------- */
        toxicHabitTobacco: ToxicDetail;
        toxicHabitAlcohol: ToxicDetail;
        toxicHabitOther: ToxicDetail;

        /* ---------------------------- Job Position History ---------------------------- */
        jobHistory: JobHistory[];

        /* ---------------------------- Job Position Risks ---------------------------- */
        jobRisks: JobRisk[];

        /* ---------------------------- Diagnostics ---------------------------- */
        diagnostics: MedicalDiagnostic[];
    };
