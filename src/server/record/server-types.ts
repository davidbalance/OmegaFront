export const RECORD_STATUS_COMPLETED: string = "completed"
export const RECORD_STATUS_STARTED: string = "started"

export type ClientRecord = {
    recordId: string;
    recordName: string;
    recordEmissionDate: Date;
    recordVersion: string;
    recordStatus: string;
}

export type ClientRecordQuery = {
    patientDni: string;
    filter?: string;
}

export type ClientRecordMetadata = {
    patientDni: string;
    metadata: any
}