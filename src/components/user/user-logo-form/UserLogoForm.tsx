import { Box, Button, Flex, Group, Radio, rem } from '@mantine/core'
import { SystemLogo } from '@/components/navbar/navlogo/logos'
import React, { ChangeEvent, FormEvent, ForwardedRef, useState } from 'react'

type UserLogoFormProps = {
    onSubmit: (values: { logo: number }) => void;
}
const UserLogoForm = React.forwardRef<HTMLButtonElement, UserLogoFormProps>(({ onSubmit }, ref: ForwardedRef<HTMLButtonElement>) => {
    const [value, setValue] = useState<keyof typeof SystemLogo>('omega');

    const handleRadioChange = (key: string) => {
        setValue(key as any)
    }

    const Logo = SystemLogo[value];

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        switch (value) {
            case 'omega':
                onSubmit({ logo: 1 });
                break;
            case 'eeq':
                onSubmit({ logo: 2 });
                break;
            case 'ipeges':
                onSubmit({ logo: 3 });
                break;
            default:
                onSubmit({ logo: 1 });
                break;
        }
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}>
            <Flex
                direction='column'
                gap={rem(16)}
                justify='center'
                align='center'>
                <Radio.Group
                    value={value}
                    onChange={handleRadioChange}
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

UserLogoForm.displayName = 'UserLogoForm';

export { UserLogoForm };