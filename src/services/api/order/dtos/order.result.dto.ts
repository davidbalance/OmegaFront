export type OrderResult = {
    id: number;
    examName: string;
    diseaseId?: number;
    diseaseName?: string;
    diseaseGroupId?: number;
    diseaseGroupName?: string;
}

export type Order = {
    id: number;
    patientDni: string;
    patientFullname: string;
    process: string;
    createAt: Date;
    results: OrderResult[];
}

export type FindOrdersRS = {
    orders: Order[];
}