import { InitialRecordPayload } from "@/server/record/create-record/initial-record";

export const parsedInitial = (value: Partial<InitialRecordPayload>): Partial<InitialRecordPayload> => ({
    ...value,
    jobAccidentDate: value.jobAccidentDate ? new Date(value.jobAccidentDate) : undefined,
    occupationalDiseaseDate: value.occupationalDiseaseDate ? new Date(value.occupationalDiseaseDate) : undefined,
    institutionJobStartDate: value.institutionJobStartDate ? new Date(value.institutionJobStartDate) : undefined,
    generalExamResults: value.generalExamResults ? value.generalExamResults.map((e) => ({ ...e, date: new Date(e.date) })) : undefined
});