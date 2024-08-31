'use client'

import { systemLogo } from '@/components/navbar/nav/logo/logos';
import { Box, Flex, Radio, RadioGroup, rem, Stack } from '@mantine/core'
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
                        <Radio value="omega" label="Omega" />
                        <Radio value="eeq" label="Empresa Electrica Quito" />
                        <Radio value="ipeges" label="Ipeges" />
                    </Stack>
                </RadioGroup>
            </Flex>
        </Box>
    );
});

export default UserFormLogo;