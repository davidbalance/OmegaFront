export type Resource = {
    resourceId: string;
    resourceLabel: string;
    resourceAddress: string;
    resourceIcon: string
}

export type CreateResourcePayload = {
    order: number;
    label: string;
    address: string;
    icon: string;
}

export type EditResourcePayload = Partial<Omit<CreateResourcePayload, 'order'>> & {
    resourceId: string
}

export type RemoveResourcePayload = {
    resourceId: string
}