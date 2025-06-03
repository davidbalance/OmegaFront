import { ReintegrateRecordPayload } from "@/server/record/create-record/reintegrate-record";

export const parsedReintegrate = (value: Partial<ReintegrateRecordPayload>): Partial<ReintegrateRecordPayload> => ({
    ...value,
    workingEndDate: value.workingEndDate ? new Date(value.workingEndDate) : undefined,
    workingReintegrationDate: value.workingReintegrationDate ? new Date(value.workingReintegrationDate) : undefined,
    generalExamResults: value.generalExamResults ? value.generalExamResults.map(e => ({ ...e, date: new Date(e.date) })) : undefined
});