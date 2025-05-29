
export type InstitutionHealthRecord = {
    institutionHealthFacility: string;
}

export type PatientRecordGender = 'male' | 'female';
export type PatientRecord = {
    patientDni: string;
    patientFirstName: string;
    patientMiddleName: string;
    patientLastName: string;
    patientSecondLastName: string;
    patientGender: PatientRecordGender;
};

export type CompanyRecord = {
    companyName: string;
    companyRUC: string;
    companyCIIU?: string;
};

export type MedicalConsultation = {
    medicalConsultationDescription: string;
}

export type ExtraActivity = {
    extraActivityDescription?: string;
}

export type CurrentDisease = {
    currentDiseaseDescription?: string;
}

export type GeneralExamResult = {
    exam: string;
    date: Date;
    result: string;
};

export type GeneralExamResultAndSpecific = {
    generalExamResults: GeneralExamResult[];
    generalExamObservation?: string;
}

export type MedicalAndSurgicalHistory = {
    medicalAndSurgicalHistory: string;
}

export type IncidentRecord = {
    incidentDescription: string;
}

export type ToxicDetail = {
    haveConsume: boolean;
    name?: string;
    consumptionTime?: number;
    quantity?: number;
    isExConsumer?: boolean;
    timeOfAbstinence?: number;
};

export type LifeStyle = {
    lifestylePhysicalActivity: boolean;
    lifestylePhysicalActivityType?: string;
    lifestylePhysicalActivityTimeQty?: string;
    lifestyleMedication: boolean;
    lifestyleMedicationName?: string;
    lifestyleMedicationTimeQty?: string;
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
    occupationalDiseaseDate?: Date;
    occupationalDiseaseObservation?: string;
};

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
    vitalSignsBloodPressure: string;
    vitalSignsTemperature: string;
    vitalSignsHeartRate: string;
    vitalSignsOxygenSaturation: string;
    vitalSignsRespiratoryRate: string;
    vitalSignsWeight: string;
    vitalSignsSize: string;
    vitalSignsMassIndex: string;
    vitalSignsAbdominalPerimeter: string;
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

export type MedicalDiagnostic = {
    description: string;
    cie: string;
    flag: 'pre' | 'def';
};

type MedicalFitnessType = 'fit' | 'fit-observation' | 'fit-limitation' | 'no-fit'
export type MedicalFitnessForJob = {
    medicalFitnessType: MedicalFitnessType;
    medicalFitnessObservation?: string;
    medicalFitnessLimitation?: string;
    medicalFitnessReubication?: string;
};

export type RecordRecommendation = {
    recommendationDescription: string;
};