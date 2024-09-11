'use server'

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { OmegaMethod } from "@/lib/api-client/omega-client/omega-api-config";
import { UserAttribute } from "@/lib/dtos/user/user/attribute/base.response.dto";
import { revalidatePath } from "next/cache";

type AttributeKey = 'lookFor' | 'doctorOf' | 'employeeOf';
type Attribute = {
    [key in AttributeKey]: { get: keyof OmegaMethod; patch: keyof OmegaMethod };
};

const attributes: Attribute = {
    lookFor: {
        get: "userAttributeLookForCompanyDetail",
        patch: "userAttributeLookForCompanyUpdate"
    },
    doctorOf: {
        get: "userAttributeDoctorOfDetail",
        patch: "userAttributeDoctorOfUpdate"
    },
    employeeOf: {
        get: "userAttributeEmployeeOfDetail",
        patch: "userAttributeEmployeeOfUpdate"
    }
}

export const retriveUserAttribute = async (id: number, attribute: AttributeKey): Promise<string | undefined> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const key = attributes[attribute].get;
    try {
        const { value }: UserAttribute = await omega()
            .addParams({ id })
            .addToken(session.access_token)
            .execute(key);
        return value;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const updateUserAttribute = async (id: number, value: string, attribute: AttributeKey): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const key = attributes[attribute].patch;

    await omega()
        .addParams({ id })
        .addBody({ value })
        .addToken(session.access_token)
        .execute(key);

    revalidatePath(`/omega/admin/patient`);
    revalidatePath(`/omega/admin/user/${id}/company`);
    revalidatePath(`/omega/admin/doctor/${id}/company`);
    revalidatePath(`/omega/admin/patient/${id}/company`);
}