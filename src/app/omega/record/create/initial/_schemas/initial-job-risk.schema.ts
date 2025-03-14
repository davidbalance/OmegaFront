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
    chemicalRiskSolid: z.coerce.boolean().default(false),
    chemicalRiskDust: z.coerce.boolean().default(false),
    chemicalRiskSmoke: z.coerce.boolean().default(false),
    chemicalRiskLiquid: z.coerce.boolean().default(false),
    chemicalRiskSteam: z.coerce.boolean().default(false),
    chemicalRiskAerosol: z.coerce.boolean().default(false),
    chemicalRiskMist: z.coerce.boolean().default(false),
    chemicalRiskGas: z.coerce.boolean().default(false),
    chemicalRiskOther: z.coerce.string().optional(),
});

const schema = z.object({
    jobRisks: z.array(JobRiskSchema)
})

export default schema;