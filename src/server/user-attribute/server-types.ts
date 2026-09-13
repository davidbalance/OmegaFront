export type UserAttribute = {
    attributeId: string;
    attributeName: string;
    attributeValue: string;
    userId: string;
}

export type UserCompanyFilter = {
    id: string;
    companyId: string;
    companyRuc: string;
    corporativeId: string;
    corporativeName: string;
    userId: string;
}

type AttributeName = 'look_for_company' | 'doctor_of' | 'employee_of';

export type FindUserAttributePayload = {
    userId: string;
    attributeName: AttributeName;
}

export type FindUserCompanyFilterPayload = {
    userId: string;
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

export type AddUserCompanyFilterPayload = {
    corporativeId: string;
    corporativeName: string;
    companyId: string;
    companyRuc: string;
    userId: string;
}

export type RemoveUserCompanyFilterPayload = {
    userId: string;
    filterId: string;
}