'use client'

import { systemLogo } from '@/components/navbar/nav/logo/logos';
import { Logo } from '@/server/logo/server-types';
import { Button, Flex, Radio, RadioGroup, rem, Stack } from '@mantine/core'
import React, { useCallback, useMemo, useState } from 'react'

type LogoSelectFormProps = {
    data?: { logo: string };
    options: Logo[];
    onSubmit?: (value: { logo: string }) => void;
}
const LogoSelectForm = React.forwardRef<HTMLFormElement, LogoSelectFormProps>(({
    data,
    options,
    onSubmit
}, ref) => {

    const [value, setValue] = useState<string>(data?.logo || options[0].logoId);
    const handleRadioChangeEvent = useCallback((key: string) => setValue(key as any), []);
    const Logo = useMemo(() => systemLogo(options.find(e => e.logoId === value)?.logoName ?? 'omega'), [options, value]);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
        (event) => {
            event.preventDefault();
            onSubmit?.({ logo: value });
        }, [value, onSubmit]);

    return (
        <form
            ref={ref}
            onSubmit={handleSubmit}>
            <Flex
                direction='row'
                gap={rem(16)}
                justify='center'
                align='center'>
                <Logo style={{ width: rem(80) }} />
                <RadioGroup
                    value={value}
                    onChange={handleRadioChangeEvent}
                    name="logo"
                    withAsterisk
                >
                    <Stack mt="xs" >
                        {options.map(e => <Radio key={e.logoId} value={e.logoId} label={`${e.logoName.slice(0, 1).toUpperCase()}${e.logoName.slice(1)}`} />)}
                    </Stack>
                </RadioGroup>
            </Flex>
            <Button type='submit' style={{ display: 'none' }} />
        </form>
    );
});

LogoSelectForm.displayName = 'LogoSelectForm';

export default LogoSelectForm;