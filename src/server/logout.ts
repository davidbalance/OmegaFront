'use server'

import auth from "@/lib/auth"
import { logout as appLogout } from "@/lib/auth/auth.utils"

export const logout = async (): Promise<void> => {
    const session = await auth();
    await appLogout(session.access_token);
}