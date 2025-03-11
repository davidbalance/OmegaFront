export type PatientRecord = {
    patientFirstName: string;
    patientMiddleName: string;
    patientLastName: string;
    patientSecondLastName: string;
    patientGender: 'male' | 'female';
};

export type CompanyRecord = {
    companyName: string;
    companyRUC: string;
    companyCIU: string;
};

export type ToxicDetail = {
    consumed: boolean;
    consumptionTime: number;
    quantity: number;
    consumer: boolean;
    timeOfAbstinence: number;
};

export type LifeStyle = {
    lifestylePhysicalActivityActive: boolean;
    lifestylePhysicalActivityType?: string;
    lifestylePhysicalActivityDuration?: number;
    lifestyleMedicationTaking: boolean;
    lifestyleMedicationName?: string;
    lifestyleMedicationQuantity?: number;
    lifestyleMedicationDuration?: number;
};

export type JobAccident = {
    jobAccidentHappened: boolean;
    jobAccidentDescription?: string;
    jobAccidentDate?: Date;
    jobAccidentObservation?: string;
};

export type OccupationalDisease = {
    occupationalDiseaseHappened: boolean;
    occupationalDiseaseDescription?: string;
    occupationalDiseaseDate?: string;
    occupationalDiseaseObservation?: string;
};

export type GeneralExam = {
    generalExamResults: GeneralExamResult[];
    generalExamObservation: string;
}

// type PhysicalRiskType = 'high-temperature' | 'low-temperature' | 'ionic-radiation' | 'non-ionic-radiation' | 'noise' | 'vibration' | 'illumination' | 'ventilation' | 'electric-fluid';
// type MechanicalRiskType = 'entrapment-between-machines' | 'trapping-between-surfaces' | 'entrapment-between-objects' | 'object-falling' | 'same-level-falling' | 'different-level-falling' | 'electric-contact' | 'surfaces-contact' | 'particles-projection' | 'fluid-projection' | 'jab' | 'cut' | 'hit-by-vehicles' | 'vehicle-collision';
// type ChemicalRiskType = 'solid' | 'dust' | 'smoke' | 'liquid' | 'steam' | 'aerosol' | 'mist' | 'gas';
// type BiologicalRisk = 'virus' | 'fungus' | 'bacteria' | 'parasites' | 'exposure-to-vectors' | 'exposure-to-wildlife-animals';
// type ErgonomicRisk = 'manual-handling-loads' | 'repetitive-moves' | 'forced-postures' | 'work-with-pvd';
// type PsychosocialRisk = 'monotony' | 'work-overload' | 'thoroughness-of-the-task' | 'high-responsibility' | 'taking-responsibility-autonomy' | 'supervision' | 'role-conflict' | 'non-function-clarify' | 'bad-work-distribution' | 'rotative-shift' | 'intrapersonal-relations' | 'job-instability';

export type PhysicalRisk<T> = {
    physicalRiskHighTemperature: T;
    physicalRiskLowTemperature: T;
    physicalRiskIonicRadiation: T;
    physicalRiskNonIonicRadiation: T;
    physicalRiskNoise: T;
    physicalRiskVibration: T;
    physicalRiskIllumination: T;
    physicalRiskVentilation: T;
    physicalRiskElectricFluid: T;
}

export type MechanicalRisk<T> = {
    mechanicRiskEntrapmentBetweenMachines: T;
    mechanicRiskTrappingBetweenSurfaces: T;
    mechanicRiskEntrapmentBetweenObjects: T;
    mechanicRiskObjectFalling: T;
    mechanicRiskSameLevelFalling: T;
    mechanicRiskDifferentLevelFalling: T;
    mechanicRiskElectricContact: T;
    mechanicRiskSurfacesContact: T;
    mechanicRiskParticlesProjection: T;
    mechanicRiskFluidProjection: T;
    mechanicRiskJab: T;
    mechanicRiskCut: T;
    mechanicRiskHitByVehicles: T;
    mechanicRiskVehicleCollision: T;
}

export type ChemicalRisk<T> = {
    chemicalRiskSolid: T;
    chemicalRiskDust: T;
    chemicalRiskSmoke: T;
    chemicalRiskLiquid: T;
    chemicalRiskSteam: T;
    chemicalRiskAerosol: T;
    chemicalRiskMist: T;
    chemicalRiskGas: T;
}

export type BiologicalRisk<T> = {
    biologicalRiskVirus: T;
    biologicalRiskFungus: T;
    biologicalRiskBacteria: T;
    biologicalRiskParasites: T;
    biologicalRiskExposureToVectors: T;
    biologicalRiskExposureToWildlifeAnimals: T;
}

export type ErgonomicRisk<T> = {
    ergonomicRiskManualHandlingLoads: T;
    ergonomicRiskRepetitiveMoves: T;
    ergonomicRiskForcedPostures: T;
    ergonomicRiskWorkWithPvd: T;
}

export type PsychosocialRisk<T> = {
   psychosocialRiskMonotony: T;
   psychosocialRiskWorkOverload: T;
   psychosocialRiskThoroughnessOfTheTask: T;
   psychosocialRiskHighResponsibility: T;
   psychosocialRiskTakingResponsibilityAutonomy: T;
   psychosocialRiskSupervision: T;
   psychosocialRiskRoleConflict: T;
   psychosocialRiskNonFunctionClarify: T;
   psychosocialRiskBadWorkDistribution: T;
   psychosocialRiskRotativeShift: T;
   psychosocialRiskIntrapersonalRelations: T;
   psychosocialRiskJobInstability: T;
}


export type FamilyHistory = {
    familyHistoryCardioVascular?: string;
    familyHistoryMetabolic?: string;
    familyHistoryNeurologic?: string;
    familyHistoryOncologic?: string;
    familyHistoryInfectious?: string;
    familyHistoryHereditary?: string;
    familyHistoryDisability?: string;
    familyHistoryOther?: string;
}

export type ReviewOfOrgansAndSystem = {
    reviewOfOrgansSkin?: string;
    reviewOfOrgansSenseOrgans?: string;
    reviewOfOrgansBreath?: string;
    reviewOfOrgansCardiovascular?: string;
    reviewOfOrgansDigestive?: string;
    reviewOfOrgansUrinary?: string;
    reviewOfOrgansSkeletalMuscle?: string;
    reviewOfOrgansEndocrinic?: string;
    reviewOfOrgansHemoLymphatic?: string;
    reviewOfOrgansHighlyStrung?: string;
}

export type VitalSignsAndAnthropometry = {
    vitalSignsBloodPressure: number;
    vitalSignsTemperature: number;
    vitalSignsHeartRate: number;
    vitalSignsOxygenSaturation: number;
    vitalSignsRespiratoryRate: number;
    vitalSignsWeight: number;
    vitalSignsSize: number;
    vitalSignsMassIndex: number;
    vitalSignsAbdominalPerimeter: number;
};

export type PhysicalRegionalExam = {
    examSkinScar?: string;
    examSkinTattoo?: string;
    examSkinLesions?: string;
    examEyeEyelids?: string;
    examEyeConjunctiva?: string;
    examEyePupils?: string;
    examEyeCorneas?: string;
    examEyeMotility?: string;
    examEarAuditoryExternal?: string;
    examEarAuricle?: string;
    examEarEardrum?: string;
    examPharynxLips?: string;
    examPharynxTongue?: string;
    examPharynxPharynx?: string;
    examPharynxTonsils?: string;
    examPharynxTeeth?: string;
    examNosePartition?: string;
    examNoseTurbinates?: string;
    examNoseMucousMembranes?: string;
    examNoseParanasalSinuses?: string;
    examNeckThyroid?: string;
    examNeckMobility?: string;
    examChestBreast?: string;
    examChestHeart?: string;
    examChestLungs?: string;
    examChestRibCage?: string;
    examAbdomenViscera?: string;
    examAbdomenAbdominalWall?: string;
    examColumnFlexibility?: string;
    examColumnDeviation?: string;
    examColumnPain?: string;
    examPelvis?: string;
    examPelvisGenitals?: string;
    examLimbVascular?: string;
    examLimbUpper?: string;
    examLimbLower?: string;
    examNeurologicForce?: string;
    examNeurologicSensitivity?: string;
    examNeurologicGait?: string;
    examNeurologicReflex?: string;
};

export type GeneralExamResult = {
    exam: string;
    date: Date;
    result: string;
};

export type MedicalDiagnostic = {
    description: string;
    cie: string;
    pre: boolean;
    def: boolean;
};

export type MedicalFitnessForJob = {
    medicalFitnessType: 'fit' | 'fit-observation' | 'fit-limitation' | 'no-fit';
    medicalFitnessObservation: string;
    medicalFitnessLimitation: string;
};