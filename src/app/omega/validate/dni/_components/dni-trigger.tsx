'use client'

import { Button } from '@mantine/core'
import React, { useCallback } from 'react'
import { useDNIValidator } from '../_context/dni-validator.context';
import { usePathname, useRouter } from 'next/navigation';

const DNITrigger = () => {

    const { data } = useDNIValidator();
    const pathname = usePathname();
    const router = useRouter();

    const handleClick = useCallback(() => {
        const dnis = data.trim().split(/\r?\n/);
        const search = new URLSearchParams();
        search.append('dni', dnis.toString());
        router.push(`${pathname}?${search.toString()}`);
    }, [data, router, pathname]);

    return (
        <Button size='xs' onClick={handleClick}>Validar</Button>
    )
}

export default DNITrigger