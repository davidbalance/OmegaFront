import { rem } from '@mantine/core';
import { IconExclamationCircle } from '@tabler/icons-react';
import { cookies, headers } from 'next/headers';
import React from 'react'

const getOmegaLogo = async () => {
    const cookieStore = cookies();
    const requestHeaders = new Headers();
    // headers().forEach((value) => console.log(value));

    cookieStore.getAll().forEach((cookie) => {
        requestHeaders.append('Cookie', `${cookie.name}=${cookie.value}`);
    });

    const response = await fetch('http://localhost:3000/api/proxy/shell/logo', {
        headers: requestHeaders,
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch the logo');
    }

    const data = await response.json();
    /* 
        response.headers.getSetCookie().forEach(cookie => {
            const name = cookie.split('=')[0];
            const cookieBody = cookie.split('=')[1];
            const value = cookieBody.split(';')[0];
            cookieStore.set(name, value);
        }) */
    return;
}

const OmegaLogo: React.FC = async () => {
    try {
        await getOmegaLogo();
    } catch (error) {
        console.error(error);
        return <IconExclamationCircle color='red' style={{ width: rem(40), height: rem(15) }} />
    }

    return (
        <div>OmegaLogo</div>
    )
}

export default OmegaLogo