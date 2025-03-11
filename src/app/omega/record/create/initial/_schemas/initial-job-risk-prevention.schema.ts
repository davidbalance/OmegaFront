import { z } from "zod";

const JobRiskSchema = z.object({
    name: z.coerce.string().nonempty(),
    activity: z.coerce.string().nonempty(),

    physicalRiskHighTemperature: z.coerce.boolean().default(false),
    physicalRiskLowTemperature: z.coerce.boolean().default(false),
    physicalRiskIonicRadiation: z.coerce.boolean().default(false),
    physicalRiskNonIonicRadiation: z.coerce.boolean().default(false),
    physicalRiskNoise: z.coerce.boolean().default(false),
    physicalRiskVibration: z.coerce.boolean().default(false),
    physicalRiskIllumination: z.coerce.boolean().default(false),
    physicalRiskVentilation: z.coerce.boolean().default(false),
    physicalRiskElectricFluid: z.coerce.boolean().default(false),
    physicalRiskOther: z.coerce.string().optional(),
    mechanicRiskEntrapmentBetweenMachines: z.coerce.boolean().default(false),
    mechanicRiskTrappingBetweenSurfaces: z.coerce.boolean().default(false),
    mechanicRiskEntrapmentBetweenObjects: z.coerce.boolean().default(false),
    mechanicRiskObjectFalling: z.coerce.boolean().default(false),
    mechanicRiskSameLevelFalling: z.coerce.boolean().default(false),
    mechanicRiskDifferentLevelFalling: z.coerce.boolean().default(false),
    mechanicRiskElectricContact: z.coerce.boolean().default(false),
    mechanicRiskSurfacesContact: z.coerce.boolean().default(false),
    mechanicRiskParticlesProjection: z.coerce.boolean().default(false),
    mechanicRiskFluidProjection: z.coerce.boolean().default(false),
    mechanicRiskJab: z.coerce.boolean().default(false),
    mechanicRiskCut: z.coerce.boolean().default(false),
    mechanicRiskHitByVehicles: z.coerce.boolean().default(false),
    mechanicRiskVehicleCollision: z.coerce.boolean().default(false),
    mechanicRiskOther: z.coerce.string().optional(),
    chemicalSolid: z.coerce.boolean().default(false),
    chemicalDust: z.coerce.boolean().default(false),
    chemicalSmoke: z.coerce.boolean().default(false),
    chemicalLiquid: z.coerce.boolean().default(false),
    chemicalSteam: z.coerce.boolean().default(false),
    chemicalAerosol: z.coerce.boolean().default(false),
    chemicalMist: z.coerce.boolean().default(false),
    chemicalGas: z.coerce.boolean().default(false),
    chemicalOther: z.coerce.string().optional(),
});

const schema = z.object({
    jobRisks: z.array(JobRiskSchema)
})

export default schema;