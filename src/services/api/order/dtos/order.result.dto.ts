export type Order = {
    id: number;
    createAt: Date;
    patient: string;
    process: string;
    results: { id: number; examName: string; }[];
}

export type FindOrdersRS = {
    orders: Order[];
}