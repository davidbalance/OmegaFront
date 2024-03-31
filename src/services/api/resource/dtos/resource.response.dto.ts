export type Resource = {
    id: number;
    name: string;
    claim: string;
}

export type FindResourcesRS = {
    resources: Resource[]
}