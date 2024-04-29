type ACRole = {
    id: number;
    name: string;
}

type ACResource = {
    id: number;
    name: string;
}

export type ACClient = {
    resources: ACResource[],
    roles: ACRole[]
}

export type FindOneACClientRS = ACClient;