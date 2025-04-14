'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth";
import { Logo } from "./server-types";

export const serverActionRetriveLogos = async (): Promise<Logo[]> => {
    const session = await auth();
    const data: Logo[] = await omega()
        .addToken(session.access_token)
        .execute('retriveLogos');
    return data;
}