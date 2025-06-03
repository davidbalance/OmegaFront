import { CertificateRecordPayload } from "@/server/record/create-record/certificate-record";

export const parsedCertificate = (value: Partial<CertificateRecordPayload>): Partial<CertificateRecordPayload> => ({
    ...value,
});