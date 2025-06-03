import { RetirementRecordPayload } from "@/server/record/create-record/retirement-record";

export const parsedRetirement = (value: Partial<RetirementRecordPayload>): Partial<RetirementRecordPayload> => ({
    ...value,
    workStartDate: value.workStartDate ? new Date(value.workStartDate) : undefined,
    workingEndDate: value.workingEndDate ? new Date(value.workingEndDate) : undefined,
    jobAccidentDate: value.jobAccidentDate ? new Date(value.jobAccidentDate) : undefined,
    occupationalDiseaseDate: value.occupationalDiseaseDate ? new Date(value.occupationalDiseaseDate) : undefined,
    generalExamResults: value.generalExamResults ? value.generalExamResults.map(e => ({ ...e, date: new Date(e.date) })) : undefined
});