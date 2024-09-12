"use server"

import omega from "@/lib/api-client/omega-client/omega"
import { LoginCredential } from "../_lib/login-credential.type";
import { redirect } from "next/navigation";

export async function loginAction(value: LoginCredential): Promise<void> {
    await omega().addBody(value).authenticate();
    redirect('/omega');
}