import { FetchError } from "@/lib/errors/fetch.error";
import { get, patch, post } from "@/lib/fetcher/fetcher";
import { DEFAULT_WITH_AUTH_OPTIONS, withAuth } from "@/lib/fetcher/with-fetch.utils";
import { FindAndUpdateACRolesRQ } from "@/services/api/access-control/dtos";
import { CreateCredentialRQ } from "@/services/api/user-credential/dtos";
import { CreateUserRQ, User } from "@/services/api/user/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const getUsers = withAuth<any, { users: User[] }>(get, DEFAULT_WITH_AUTH_OPTIONS);
        const users: { users: User[] } = await getUsers(endpoints.USER.V1.FIND, {});
        return NextResponse.json(users.users, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}

type CreateCredentialWithoutUser = Omit<CreateCredentialRQ, 'user'>;
type UpdateACRoles = Omit<FindAndUpdateACRolesRQ, 'user'>;
type UpdateLogo = { logo: number };
type CreateUserParam = CreateUserRQ & CreateCredentialWithoutUser & UpdateACRoles & UpdateLogo;
export async function POST(req: NextRequest) {
    try {
        const data: CreateUserParam = await req.json();

        const userBody: CreateUserRQ = data;
        const postUser = withAuth<CreateUserRQ, User>(post, DEFAULT_WITH_AUTH_OPTIONS);
        const user = await postUser(endpoints.USER.V1.CREATE, { body: userBody });

        const { ...credentialWithoutUser }: CreateCredentialWithoutUser = data;
        const credentialBody: CreateCredentialRQ = { ...credentialWithoutUser, user: user.id! }
        const postCredential = withAuth(post, DEFAULT_WITH_AUTH_OPTIONS);
        await postCredential(endpoints.CREDENTIAL.V1.CREATE, { body: credentialBody });

        const { ...acRolesBody }: UpdateACRoles = data;
        const patchRole = withAuth(patch, DEFAULT_WITH_AUTH_OPTIONS);
        await patchRole(endpoints.ACCESS_CONTROL.V1.FIND_ONE_AND_UPDATE_ROLES(`${user.id}`), { body: acRolesBody });

        const { ...logoBody }: UpdateLogo = data;
        const patchLogo = withAuth(patch, DEFAULT_WITH_AUTH_OPTIONS);
        await patchLogo(endpoints.OMEGA_WEB_CLIENT.V1.UPDATE_ONE_LOGO(`${user.id}`), { body: logoBody });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        if (error instanceof FetchError) {
            return NextResponse.json({ message: error.message, data: error.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
        }
    }
}