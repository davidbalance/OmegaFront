import { Box, Button, Flex, Group, Radio, rem } from '@mantine/core'
import { SystemLogo } from '@/components/navbar/nav/logo/logos'
import React, { FormEvent, ForwardedRef, useCallback, useMemo, useState } from 'react'

type UserFormLogoProps = {
    onSubmit: (values: { logo: number }) => void;
}

const logoValue: Record<keyof (typeof SystemLogo), number> = {
    omega: 1,
    eeq: 2,
    ipeges: 3
}

const UserFormLogo = React.forwardRef<HTMLButtonElement, UserFormLogoProps>(({ onSubmit }, ref: ForwardedRef<HTMLButtonElement>) => {
    const [value, setValue] = useState<keyof typeof SystemLogo>('omega');

    const handleRadioChnageEvent = useCallback((key: string) => setValue(key as any), []);

    const Logo = useMemo(() => SystemLogo[value], [value]);

    const handleFormSubmittionEvent = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({ logo: logoValue[value] });
    }, [onSubmit, value]);

    return (
        <Box
            component='form'
            onSubmit={handleFormSubmittionEvent}>
            <Flex
                direction='column'
                gap={rem(16)}
                justify='center'
                align='center'>
                <Radio.Group
                    value={value}
                    onChange={handleRadioChnageEvent}
                    name="logo"
                    withAsterisk
                >
                    <Group mt="xs" >
                        <Radio value="omega" label="Omega" />
                        <Radio value="eeq" label="Empresa Electrica Quito" />
                        <Radio value="ipeges" label="Ipeges" />
                    </Group>
                </Radio.Group>
                <Logo style={{ width: rem(80) }} />
                <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>
            </Flex>
        </Box>
    );
});

UserFormLogo.displayName = 'UserFormLogo';

export { UserFormLogo };