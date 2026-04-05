import { z } from "zod";

const skinSchema = z.object({
    scars: z.coerce.string().optional(),
    appendages: z.coerce.string().optional(),
})

const eyeSchema = z.object({
    eyelids: z.coerce.string().optional(),
    conjunctiva: z.coerce.string().optional(),
    pupils: z.coerce.string().optional(),
    cornea: z.coerce.string().optional(),
    motility: z.coerce.string().optional(),
})

const earSchema = z.object({
    externalAuditoryCanal: z.coerce.string().optional(),
    auricle: z.coerce.string().optional(),
    eardrums: z.coerce.string().optional(),
})

const oropharynxSchema = z.object({
    lips: z.coerce.string().optional(),
    tongue: z.coerce.string().optional(),
    pharynx: z.coerce.string().optional(),
    tonsils: z.coerce.string().optional(),
    teeth: z.coerce.string().optional(),
})

const noseSchema = z.object({
    septum: z.coerce.string().optional(),
    turbinates: z.coerce.string().optional(),
    mucosa: z.coerce.string().optional(),
    paranasalSinuses: z.coerce.string().optional(),
})

const neckSchema = z.object({
    thyroid: z.coerce.string().optional(),
    mobility: z.coerce.string().optional(),
})

const chestSchema = z.object({
    breasts: z.coerce.string().optional(),
    lungs: z.coerce.string().optional(),
    heart: z.coerce.string().optional(),
    ribCage: z.coerce.string().optional(),
})

const abdomenSchema = z.object({
    viscera: z.coerce.string().optional(),
    abdominalWall: z.coerce.string().optional(),
})

const columnSchema = z.object({
    flexibility: z.coerce.string().optional(),
    deviation: z.coerce.string().optional(),
    pain: z.coerce.string().optional(),
})

const pelvisSchema = z.object({
    pelvis: z.coerce.string().optional(),
    genitals: z.coerce.string().optional(),
})

const extremitiesSchema = z.object({
    vascular: z.coerce.string().optional(),
    upperLimbs: z.coerce.string().optional(),
    lowerLimbs: z.coerce.string().optional(),
})

const neurologicSchema = z.object({
    strength: z.coerce.string().optional(),
    sensation: z.coerce.string().optional(),
    gait: z.coerce.string().optional(),
    reflexes: z.coerce.string().optional(),
})

const schema = z.object({
    physicalExam: z.object({
        region: z.object({
            skin: skinSchema,
            eye: eyeSchema,
            ear: earSchema,
            oropharynx: oropharynxSchema,
            nose: noseSchema,
            neck: neckSchema,
            thorax: chestSchema,
            abdomen: abdomenSchema,
            spine: columnSchema,
            pelvis: pelvisSchema,
            extremities: extremitiesSchema,
            neurological: neurologicSchema,
        }),
        examObservation: z.coerce.string().optional()
    })
});

export type PhysicalRegionalExamSchemaType = z.infer<typeof schema>

export const adjustInitialValue = (data?: Partial<PhysicalRegionalExamSchemaType>): PhysicalRegionalExamSchemaType => ({
    physicalExam: {
        region: {
            skin: {
                scars: data?.physicalExam?.region?.skin?.scars ?? "",
                appendages: data?.physicalExam?.region?.skin?.appendages ?? "",
            },
            eye: {
                eyelids: data?.physicalExam?.region?.eye?.eyelids ?? "",
                conjunctiva: data?.physicalExam?.region?.eye?.conjunctiva ?? "",
                pupils: data?.physicalExam?.region?.eye?.pupils ?? "",
                cornea: data?.physicalExam?.region?.eye?.cornea ?? "",
                motility: data?.physicalExam?.region?.eye?.motility ?? "",
            },
            ear: {
                externalAuditoryCanal: data?.physicalExam?.region?.ear?.externalAuditoryCanal ?? "",
                auricle: data?.physicalExam?.region?.ear?.auricle ?? "",
                eardrums: data?.physicalExam?.region?.ear?.eardrums ?? "",
            },
            oropharynx: {
                lips: data?.physicalExam?.region?.oropharynx?.lips ?? "",
                tongue: data?.physicalExam?.region?.oropharynx?.tongue ?? "",
                pharynx: data?.physicalExam?.region?.oropharynx?.pharynx ?? "",
                tonsils: data?.physicalExam?.region?.oropharynx?.tonsils ?? "",
                teeth: data?.physicalExam?.region?.oropharynx?.teeth ?? "",
            },
            nose: {
                septum: data?.physicalExam?.region?.nose?.septum ?? "",
                turbinates: data?.physicalExam?.region?.nose?.turbinates ?? "",
                mucosa: data?.physicalExam?.region?.nose?.mucosa ?? "",
                paranasalSinuses: data?.physicalExam?.region?.nose?.paranasalSinuses ?? "",
            },
            neck: {
                thyroid: data?.physicalExam?.region?.neck?.thyroid ?? "",
                mobility: data?.physicalExam?.region?.neck?.mobility ?? "",
            },
            thorax: {
                breasts: data?.physicalExam?.region?.thorax?.breasts ?? "",
                lungs: data?.physicalExam?.region?.thorax?.lungs ?? "",
                heart: data?.physicalExam?.region?.thorax?.heart ?? "",
                ribCage: data?.physicalExam?.region?.thorax?.ribCage ?? "",
            },
            abdomen: {
                viscera: data?.physicalExam?.region?.abdomen?.viscera ?? "",
                abdominalWall: data?.physicalExam?.region?.abdomen?.abdominalWall ?? "",
            },
            spine: {
                flexibility: data?.physicalExam?.region?.spine?.flexibility ?? "",
                deviation: data?.physicalExam?.region?.spine?.deviation ?? "",
                pain: data?.physicalExam?.region?.spine?.pain ?? "",
            },
            pelvis: {
                pelvis: data?.physicalExam?.region?.pelvis?.pelvis ?? "",
                genitals: data?.physicalExam?.region?.pelvis?.genitals ?? "",
            },
            extremities: {
                vascular: data?.physicalExam?.region?.extremities?.vascular ?? "",
                upperLimbs: data?.physicalExam?.region?.extremities?.upperLimbs ?? "",
                lowerLimbs: data?.physicalExam?.region?.extremities?.lowerLimbs ?? "",
            },
            neurological: {
                strength: data?.physicalExam?.region?.neurological?.strength ?? "",
                sensation: data?.physicalExam?.region?.neurological?.sensation ?? "",
                gait: data?.physicalExam?.region?.neurological?.gait ?? "",
                reflexes: data?.physicalExam?.region?.neurological?.reflexes ?? "",
            },
        },
        examObservation: data?.physicalExam?.examObservation ?? "",
    }
});

export default schema;