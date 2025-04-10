import { Order } from "@/lib/types/pagination.type";

export type MedicalDisease = {
    diseaseReportId: string;
    diseaseId: string;
    diseaseName: string;
    diseaseGroupId: string;
    diseaseGroupName: string;
    diseaseCommentary: string;
}

export type MedicalReport = {
    testId: string;
    reportContent?: string;
}

export type MedicalTest = {
    testId: string;
    testCheck: boolean;
    resultHasFile: boolean;
    reportHasContent: boolean;
    orderId: string;
    examName: string;
    examSubtype: string;
    examType: string;
    diseases: string[];
}

export type MedicalTestQuery = {
    orderId: string;
    filter?: string;
} & Order<MedicalTest>;

export type MedicalDiseaseReportQuery = {
    locationCorporative?: string;
    locationCompany?: string;
    orderYear?: number;
}

export type MedicalFileResult = {
    total: number;
    found: number;
    notFound: number;
}

export type CreateMedicalTestPayload = {
    orderId: string;
    examName: string;
    examSubtype: string;
    examType: string;
}

export type CreateMedicalDiseasePayload = {
    testId: string;
    diseaseId: string;
    diseaseName: string;
    diseaseGroupId: string;
    diseaseGroupName: string;
    commentary: string;
}

export type EditMedicalDiseasePayload = {
    diseaseReportId: string;
    testId: string;
    diseaseId: string;
    diseaseName: string;
    diseaseGroupId: string;
    diseaseGroupName: string;
    commentary: string;
}

export type AddMedicalReportPayload = {
    testId: string;
    content: string;
}

export type EditMedicalTestExamPayload = {
    testId: string;
    examName: string;
    examSubtype: string;
    examType: string;
}

export type MedicalFileZipPayload = {
    testId: string;
    examName: string;
    fileType: 'result' | 'report';
};