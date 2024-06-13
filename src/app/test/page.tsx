'use client'

import { useCookie } from '@/hooks/useCookie/useCookie';
import { useGet } from '@/hooks/useCrud';
import { AUTH_TOKEN_COOKIE } from '@/lib/constants';
import { User } from '@/services/api/user/dtos';
import endpoints from '@/lib/endpoints/endpoints';
import { Button } from '@mantine/core';
import React from 'react'

const page = () => {

    const { data, error, isLoading, refresh } = useGet<{ users: User[] }>(endpoints.USER.V1.FIND, {
        auth: true, refreshURL: endpoints.AUTHENTICATION.V1.REFRESH, fetchOnMount: false
    });

    const [tokenAuth, AuthenticationToken] = useCookie(AUTH_TOKEN_COOKIE);

    return (
        <>
            <div>Token: {AUTH_TOKEN_COOKIE} = {JSON.stringify(tokenAuth)}</div>
            <div>data {JSON.stringify(data)}</div>
            <Button onClick={refresh}>Reload</Button>
        </>
    )
}

export default page