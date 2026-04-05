import { z } from "zod";

const physicalSchema = z.object({
    highTemperature: z.boolean().default(false),
    lowTemperature: z.boolean().default(false),
    ionizingRadiation: z.boolean().default(false),
    nonIonizingRadiation: z.boolean().default(false),
    noise: z.boolean().default(false),
    vibration: z.boolean().default(false),
    lighting: z.boolean().default(false),
    ventilation: z.boolean().default(false),
    electricCurrent: z.boolean().default(false),
    other: z.string().optional()
})
export type PhysicalSchemaType = z.infer<typeof physicalSchema>

const locativeSchema = z.object({
    missingSignageCleaningDisorder: z.boolean().default(false)
})
export type LocativeSchemaType = z.infer<typeof locativeSchema>

const mechanicalSchema = z.object({
    machineOrSurfaceEntrapment: z.boolean().default(false),
    objectEntrapment: z.boolean().default(false),
    fallingObjects: z.boolean().default(false),
    fallsSameLevel: z.boolean().default(false),
    fallsDifferentLevel: z.boolean().default(false),
    punctures: z.boolean().default(false),
    cuts: z.boolean().default(false),
    vehicleCollision: z.boolean().default(false),
    vehicleRunOver: z.boolean().default(false),
    fluidProjection: z.boolean().default(false),
    particleProjection: z.boolean().default(false),
    contactWithWorkSurfaces: z.boolean().default(false)
})
export type MechanicalSchemaType = z.infer<typeof mechanicalSchema>

const electricalSchema = z.object({
    electricalContact: z.boolean().default(false)
})
export type ElectricalSchemaType = z.infer<typeof electricalSchema>


const safetySchema = z.object({
    locative: locativeSchema,
    mechanical: mechanicalSchema,
    electrical: electricalSchema,
    other: z.string().optional()
})
export type SafetySchemaType = z.infer<typeof safetySchema>

const chemicalSchema = z.object({
    dust: z.boolean().default(false),
    solids: z.boolean().default(false),
    smoke: z.boolean().default(false),
    liquids: z.boolean().default(false),
    vapors: z.boolean().default(false),
    aerosols: z.boolean().default(false),
    mists: z.boolean().default(false),
    gases: z.boolean().default(false),
    other: z.string().optional()
})
export type ChemicalSchemaType = z.infer<typeof chemicalSchema>

const biologicalSchema = z.object({
    virus: z.boolean().default(false),
    fungi: z.boolean().default(false),
    bacteria: z.boolean().default(false),
    parasites: z.boolean().default(false),
    vectorExposure: z.boolean().default(false),
    wildAnimalExposure: z.boolean().default(false),
    other: z.string().optional()
})
export type BiologicalSchemaType = z.infer<typeof biologicalSchema>

const ergonomicSchema = z.object({
    manualHandling: z.boolean().default(false),
    repetitiveMovements: z.boolean().default(false),
    forcedPostures: z.boolean().default(false),
    pvdWork: z.boolean().default(false),
    poorWorkstationDesign: z.boolean().default(false),
    other: z.string().optional()
})
export type ErgonomicSchemaType = z.infer<typeof ergonomicSchema>

const psychosocialSchema = z.object({
    monotony: z.boolean().default(false),
    workOverload: z.boolean().default(false),
    taskDetail: z.boolean().default(false),
    highResponsibility: z.boolean().default(false),
    decisionAutonomy: z.boolean().default(false),
    poorSupervision: z.boolean().default(false),
    roleConflict: z.boolean().default(false),
    unclearResponsibilities: z.boolean().default(false),
    poorTaskDistribution: z.boolean().default(false),
    rotatingShifts: z.boolean().default(false),
    interpersonalRelations: z.boolean().default(false),
    jobInstability: z.boolean().default(false),
    criminalThreat: z.boolean().default(false),
    other: z.string().optional()
})
export type PsychosocialSchemaType = z.infer<typeof psychosocialSchema>

export type PhysicalFormType = `physical.${keyof Omit<PhysicalSchemaType, "other">}`
export type SafetyLocativeFormType = `safety.locative.${keyof LocativeSchemaType}`
export type SafetyMechanicalFormType = `safety.mechanical.${keyof MechanicalSchemaType}`
export type SafetyElectricalFormType = `safety.electrical.${keyof ElectricalSchemaType}`
export type ChemicalFormType = `chemical.${keyof Omit<ChemicalSchemaType, "other">}`
export type BiologicalFormType = `biological.${keyof Omit<BiologicalSchemaType, "other">}`
export type ErgonomicFormType = `ergonomic.${keyof Omit<ErgonomicSchemaType, "other">}`
export type PsychosocialFormType = `psychosocial.${keyof Omit<PsychosocialSchemaType, "other">}`

const riskFactorSchema = z.object({
    physical: physicalSchema,
    safety: safetySchema,
    chemical: chemicalSchema,
    biological: biologicalSchema,
    ergonomic: ergonomicSchema,
    psychosocial: psychosocialSchema,
    preventiveMeasure: z.string().default("")
});
export type RiskFactorSchemaType = z.infer<typeof riskFactorSchema>

export const DEFAULT_RISK_FACTOR: RiskFactorSchemaType = {
    physical: {
        highTemperature: false,
        lowTemperature: false,
        ionizingRadiation: false,
        nonIonizingRadiation: false,
        noise: false,
        vibration: false,
        lighting: false,
        ventilation: false,
        electricCurrent: false,
        other: ""
    },
    safety: {
        locative: {
            missingSignageCleaningDisorder: false,
        },
        mechanical: {
            machineOrSurfaceEntrapment: false,
            objectEntrapment: false,
            fallingObjects: false,
            fallsSameLevel: false,
            fallsDifferentLevel: false,
            punctures: false,
            cuts: false,
            vehicleCollision: false,
            vehicleRunOver: false,
            fluidProjection: false,
            particleProjection: false,
            contactWithWorkSurfaces: false
        },
        electrical: {
            electricalContact: false
        },
        other: ""
    },
    chemical: {
        dust: false,
        solids: false,
        smoke: false,
        liquids: false,
        vapors: false,
        aerosols: false,
        mists: false,
        gases: false,
        other: ""
    },
    biological: {
        virus: false,
        fungi: false,
        bacteria: false,
        parasites: false,
        vectorExposure: false,
        wildAnimalExposure: false,
        other: ""
    },
    ergonomic: {
        manualHandling: false,
        repetitiveMovements: false,
        forcedPostures: false,
        pvdWork: false,
        poorWorkstationDesign: false,
        other: ""
    },
    psychosocial: {
        monotony: false,
        workOverload: false,
        taskDetail: false,
        highResponsibility: false,
        decisionAutonomy: false,
        poorSupervision: false,
        roleConflict: false,
        unclearResponsibilities: false,
        poorTaskDistribution: false,
        rotatingShifts: false,
        interpersonalRelations: false,
        jobInstability: false,
        criminalThreat: false,
        other: ""
    },
    preventiveMeasure: ""
}

const schema = z.object({
    riskFactors: z.array(riskFactorSchema)
});

export type RiskFactorsSchemaType = z.infer<typeof schema>

export const adjustInitialValue = (data?: Partial<RiskFactorsSchemaType>): RiskFactorsSchemaType => ({
    riskFactors: [DEFAULT_RISK_FACTOR],
    ...data,
})

export default schema;