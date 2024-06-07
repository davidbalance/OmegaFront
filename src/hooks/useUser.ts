import endpoints from "@/services/endpoints/endpoints";
import { usePatch, usePost } from "./useCrud";
import { CreateUserRQ, User } from "@/services/api/user/dtos";
import { FindAndUpdateACRolesRQ } from "@/services/api/access-control/dtos";
import { CreateCredentialRQ } from "@/services/api/user-credential/dtos";
import { useEffect, useState } from "react";

type CreateCredentialWithoutUser = Omit<CreateCredentialRQ, 'user'>;
type UpdateACRoles = Omit<FindAndUpdateACRolesRQ, 'user'>;
type UpdateLogo = { logo: number };
type CreateUserParam = CreateUserRQ & CreateCredentialWithoutUser & UpdateACRoles & UpdateLogo;

type UserCreateHookResult = {
    create: (params: CreateUserParam) => void;
    clean: () => void;
    user: User | null;
    error: Error | null;
    isLoading: boolean;
    isComplete: boolean;
}
const useUserCreate = (): UserCreateHookResult => {
    const postUser = usePost<User>(endpoints.USER.V1.CREATE, { auth: true, refreshURL: endpoints.AUTHENTICATION.V1.REFRESH });
    const postCredential = usePost<any>(endpoints.CREDENTIAL.V1.CREATE, { auth: true, refreshURL: endpoints.AUTHENTICATION.V1.REFRESH });
    const patchAccessControl = usePatch<any>(endpoints.ACCESS_CONTROL.V1.FIND_ONE_AND_UPDATE_ROLES(postUser.data?.id ? `${postUser.data?.id}` : ''), { auth: true, refreshURL: endpoints.AUTHENTICATION.V1.REFRESH });
    const patchWebClient = usePatch<any>(endpoints.OMEGA_WEB_CLIENT.V1.UPDATE_ONE_LOGO(postUser.data?.id ? `${postUser.data?.id}` : ''), { auth: true, refreshURL: endpoints.AUTHENTICATION.V1.REFRESH });

    const [requestBody, setRequestBody] = useState<CreateUserParam | null>(null);

    const handleRequestBody = (body: CreateUserParam) => setRequestBody(body);

    const handleClean = () => {
        setRequestBody(null);
        postUser.clean();
        postCredential.clean();
        patchAccessControl.clean();
        patchWebClient.clean();
    }

    useEffect(() => {
        if (requestBody) {
            const { ...body }: CreateUserRQ = requestBody;
            console.log(body);
            postUser.send(body);
        }
    }, [requestBody]);

    /* useEffect(() => {
        if (requestBody && postUser.data && !postUser.error) {
            const { ...data }: CreateCredentialWithoutUser = requestBody
            const credentialBody: CreateCredentialRQ = { ...data, user: postUser.data.id! };
            postCredential.send(credentialBody);
        }
    }, [postUser.data, postUser.error]);


    useEffect(() => {
        if (requestBody && postCredential.data && !postCredential.error) {
            const { ...acRolesBody }: UpdateACRoles = requestBody
            patchAccessControl.send(acRolesBody);
        }
    }, [postCredential.data, postCredential.error]);

    useEffect(() => {
        if (requestBody && !patchAccessControl.data && !patchAccessControl.error) {
            const { ...logoBody }: UpdateLogo = requestBody
            patchWebClient.send(logoBody);
        }
    }, [patchAccessControl.data, patchAccessControl.error]); */

    const error = postUser.error || postCredential.error || patchAccessControl.error || patchWebClient.error;
    const isLoading = postUser.isLoading || postCredential.isLoading || patchAccessControl.isLoading || patchWebClient.isLoading;
    const isComplete = !!(postUser.data && postCredential.data && patchAccessControl.data && patchWebClient.data);

    return {
        create: handleRequestBody,
        clean: handleClean,
        user: postUser.data,
        error: error,
        isLoading: isLoading,
        isComplete: isComplete,
    }
}

export { useUserCreate }