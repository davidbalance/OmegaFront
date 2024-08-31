'use client'

import { systemLogo } from '@/components/navbar/nav/logo/logos';
import { Box, Button, Flex, Radio, RadioGroup, rem, Stack } from '@mantine/core'
import React, { FormEvent, useCallback, useMemo, useState } from 'react'

type UserFormLogoProps = {
    data?: { logo: string };
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

const UserFormLogo = React.forwardRef<HTMLFormElement, UserFormLogoProps>(({
    data,
    onSubmit
}, ref) => {

    const [value, setValue] = useState<string>(data?.logo || 'omega');
    const handleRadioChnageEvent = useCallback((key: string) => setValue(key as any), []);
    const Logo = useMemo(() => systemLogo(value), [value]);

    return (
        <Box
            ref={ref}
            component='form'
            onSubmit={onSubmit}>
            <Flex
                direction='row'
                gap={rem(16)}
                justify='center'
                align='center'>
                <Logo style={{ width: rem(80) }} />
                <RadioGroup
                    value={value}
                    onChange={handleRadioChnageEvent}
                    name="logo"
                    withAsterisk
                >
                    <Stack mt="xs" >
                        <Radio value="1" label="Omega" />
                        <Radio value="2" label="Empresa Electrica Quito" />
                        <Radio value="3" label="Ipeges" />
                    </Stack>
                </RadioGroup>
            </Flex>
            <Button type='submit' style={{ display: 'none' }} />
        </Box>
    );
});

export default UserFormLogo;