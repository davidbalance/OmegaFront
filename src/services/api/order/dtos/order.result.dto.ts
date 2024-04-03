export type OrderResult = {
    id: number;
    examName: string;
    disease?: number;
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