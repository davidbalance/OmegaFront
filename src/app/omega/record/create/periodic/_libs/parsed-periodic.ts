import { PeriodicRecordPayload } from "@/server/record/create-record/periodic-record";

export const parsedPeriodic = (value: Partial<PeriodicRecordPayload>): Partial<PeriodicRecordPayload> => ({
    ...value,
    jobAccidentDate: value.jobAccidentDate ? new Date(value.jobAccidentDate) : undefined,
    occupationalDiseaseDate: value.occupationalDiseaseDate ? new Date(value.occupationalDiseaseDate) : undefined,
    generalExamResults: value.generalExamResults ? value.generalExamResults.map(e => ({ ...e, date: new Date(e.date) })) : undefined
});