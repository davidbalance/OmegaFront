export type ClientRecord = {
    recordId: string;
    recordName: string;
    recordEmissionDate: Date;
}

export type ClientRecordQuery = {
    patientDni: string;
    filter?: string;
}
