import { UserService } from "@/services/api";
import endpoints from "@/services/endpoints/endpoints";
import { useLayoutEffect } from "react";
import { FetchOptions, useFetch } from "./useFetch";

const findFetchOptions: FetchOptions = { cacheKey: 'find-many-user', auth: endpoints.AUTHENTICATION.V1, method: 'GET' };
const findOneFetchOptions: FetchOptions = { cacheKey: 'find-one-user', auth: endpoints.AUTHENTICATION.V1, method: 'GET', fetchOnMount: false };
const createOneFetchOptions: FetchOptions = { auth: endpoints.AUTHENTICATION.V1, method: 'POST', fetchOnMount: false };
const updateOneFetchOptions: FetchOptions = { auth: endpoints.AUTHENTICATION.V1, method: 'PATCH', fetchOnMount: false };
const deleteOneFetchOptions: FetchOptions = { auth: endpoints.AUTHENTICATION.V1, method: 'DELETE', fetchOnMount: false };

export const useUser = (loadOnStart: boolean = false) => {
    const findMany = useFetch(endpoints.USER.V1.FIND, findFetchOptions);
    const findOne = useFetch(endpoints.USER.V1.FIND_ONE, findOneFetchOptions);
    const createOne = useFetch(endpoints.USER.V1.CREATE, createOneFetchOptions);
    const updateOne = useFetch(endpoints.USER.V1.FIND_ONE_AND_UPDATE, updateOneFetchOptions);
    const deleteOne = useFetch(endpoints.USER.V1.FIND_ONE_AND_DELETE, deleteOneFetchOptions);


    return {
    }
};