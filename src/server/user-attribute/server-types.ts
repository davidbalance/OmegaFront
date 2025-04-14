export type UserAttribute = {
    attributeId: string;
    attributeName: string;
    attributeValue: string;
    userId: string;
}

type AttributeName = 'look_for_company' | 'doctor_of' | 'employee_of';

export type FindUserAttributePayload = {
    userId: string;
    attributeName: AttributeName;
}

export type AddUserAttributePayload = {
    userId: string;
    attributeName: AttributeName;
    attributeValue: string;
}

export type RemoveUserAttributePayload = {
    userId: string;
    attributeId: string;
}