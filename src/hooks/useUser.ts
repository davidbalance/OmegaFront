import endpoints from "@/services/endpoints/endpoints";
import { useDelete, useGet, usePatch, usePost } from "./useCrud";
import { useList } from "./useList";
import { CreateUserRQ, UpdateUserRQ, User } from "@/services/api/user/dtos";
import { FindAndUpdateACRolesRQ } from "@/services/api/access-control/dtos";
import { CreateCredentialRQ } from "@/services/api/user-credential/dtos";
import { useEffect, useState } from "react";
import { error } from "console";

type CreateCredentialWithoutUser = Omit<CreateCredentialRQ, 'user'>;
type UpdateACRoles = Omit<FindAndUpdateACRolesRQ, 'user'>;
type UpdateLogo = { logo: number };
type CreateUserParam = CreateUserRQ & CreateCredentialWithoutUser & UpdateACRoles & UpdateLogo;

const useCreateUser = () => {
    const postUser = usePost<User>(endpoints.USER.V1.CREATE, { fetchOnMount: false, auth: { refresh: endpoints.AUTHENTICATION.V1.REFRESH } });
    const postCredential = usePost(endpoints.CREDENTIAL.V1.CREATE, { fetchOnMount: false, auth: { refresh: endpoints.AUTHENTICATION.V1.REFRESH } });
    const patchAccessControl = usePatch(endpoints.ACCESS_CONTROL.V1.FIND_ONE_AND_UPDATE_ROLES(postUser.data?.id ? `${postUser.data?.id}` : ''), { fetchOnMount: false, auth: { refresh: endpoints.AUTHENTICATION.V1.REFRESH } });
    const patchWebClient = usePatch(endpoints.OMEGA_WEB_CLIENT.V1.UPDATE_ONE_LOGO(postUser.data?.id ? `${postUser.data?.id}` : ''), { fetchOnMount: false, auth: { refresh: endpoints.AUTHENTICATION.V1.REFRESH } });

    const [requestBody, setRequestBody] = useState<CreateUserParam | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const handleRequestBody = (body: CreateUserParam) => setRequestBody(body);

    const createUser = () => {
        if (!requestBody) {
            setError(new Error('Request body not added'));
            return;
        }
        const { ...body }: CreateUserRQ = requestBody;
        postUser.send(body);
    }

    const createCredential = () => {
        if (!requestBody) {
            setError(new Error('Request body not added'));
            return;
        }

        if (postUser.data === null) {
            setError(new Error('User not found'));
            return;
        }
        const { ...data }: CreateCredentialWithoutUser = requestBody
        const body: CreateCredentialRQ = { ...data, user: postUser.data.id! };
        postCredential.send(body);
    }

    const updateRoles = () => {
        if (!requestBody) {
            setError(new Error('Request body not added'));
            return;
        }
        if (postUser.data === null) {
            setError(new Error('User not found'));
            return;
        }
        const { ...body }: UpdateACRoles = requestBody
        patchAccessControl.send(body);
    }

    const updateLogo = () => {
        if (!requestBody) {
            setError(new Error('Request body not added'));
            return;
        }
        if (postUser.data === null) {
            setError(new Error('User not found'));
            return;
        }
        const { ...body }: UpdateLogo = requestBody
        patchWebClient.send(body);
    }

    useEffect(() => {
        if (requestBody) {
            createUser();
        }
        return () => { }
    }, [requestBody]);

    useEffect(() => {
        if (postUser.data) {
            createCredential();
            updateRoles();
            updateLogo();
        }
        return () => { }
    }, [postUser.data]);

    return {
        create: handleRequestBody,
        user: postUser.data,
        error: postUser.error || postCredential.error || patchAccessControl.error || patchWebClient.error || error,
        isLoading: postUser.isLoading || postCredential.isLoading || patchAccessControl.isLoading || patchWebClient.isLoading
    }
}

export const useUser = () => {

    const [user, setUser] = useState<User | null>(null);

    const createUser = useCreateUser();
    const readUser = useGet<{ users: User[] }>(endpoints.USER.V1.FIND, { auth: { refresh: endpoints.AUTHENTICATION.V1.REFRESH } });
    const updateUser = usePatch<User>(endpoints.USER.V1.FIND_ONE_AND_UPDATE(user?.id ? `${user.id}` : ''), { fetchOnMount: false, auth: { refresh: endpoints.AUTHENTICATION.V1.REFRESH } });
    const deleteUser = useDelete<any>(endpoints.USER.V1.FIND_ONE_AND_DELETE(user?.id ? `${user.id}` : ''), { fetchOnMount: false, auth: { refresh: endpoints.AUTHENTICATION.V1.REFRESH } });

    const [users, ListHandlers] = useList<User>(readUser.data?.users ?? []);

    const handleUserSelection = (value: User | null) => setUser(value);
    const handleUserCreate = createUser.create;
    const handleUserUpdate = (params: UpdateUserRQ) => updateUser.send(params);
    const handleUserDelete = () => {
        if (user) {
            deleteUser.refresh();
        }
    }

    useEffect(() => {
        if (createUser.user) {
            ListHandlers.append(createUser.user);
        }
        return () => { }
    }, [createUser.user]);

    useEffect(() => {
        if (updateUser.data) {
            const index: number = [...users].findIndex((e) => e.id === updateUser.data?.id);
            ListHandlers.update(index, updateUser.data);
            setUser(null);
        }
        return () => { }
    }, [updateUser.data]);

    useEffect(() => {
        if (deleteUser.data) {
            const index: number = [...users].findIndex((e) => user?.id === e.id);
            ListHandlers.remove(index);
            setUser(null);
        }
        return () => { }
    }, [deleteUser.data]);

    return {
        error: createUser.error || readUser.error || updateUser.error || deleteUser.error,
        isLoading: createUser.isLoading || readUser.isLoading || updateUser.isLoading || deleteUser.isLoading,
        users: users,
        create: handleUserCreate,
        update: handleUserUpdate,
        remove: handleUserDelete,
        select: handleUserSelection,
    }
};