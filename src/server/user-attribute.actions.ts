'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { OmegaMethod } from "@/lib/api-client/omega-client/omega-api-config";
import { GetUserAttributeResponseDto } from "@/lib/dtos/user/user/attribute/response.dto";
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
        const { value }: GetUserAttributeResponseDto = await omega()
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

    try {
        await omega()
            .addParams({ id })
            .addBody({ value })
            .addToken(session.access_token)
            .execute(key);
    } catch (error) {
        return undefined;
    }
}