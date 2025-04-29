'use client'

import { Box, TextInput, rem, ActionIcon } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { IconKey, IconDeviceFloppy } from '@tabler/icons-react'
import React, { useCallback, useState } from 'react'
import ApiKeySchema from './schemas/api-key.schema';
import { z } from 'zod'

type ApiKeyFormProps = {
    onSubmit?: (value: z.infer<typeof ApiKeySchema>) => Promise<void>;
}
const ApiKeyForm: React.FC<ApiKeyFormProps> = ({
    onSubmit
}) => {

    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof ApiKeySchema>>({
        initialValues: { apikey: '', },
        validate: zodResolver(ApiKeySchema)
    })

    const handleSubmit = useCallback(
        async (value: z.infer<typeof ApiKeySchema>) => {
            setLoading(true);
            await onSubmit?.(value);
            form.reset();
            setLoading(false);
        }, [form, onSubmit])

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                label='Ingrese nombre del api key'
                placeholder='Mi api key'
                leftSectionPointerEvents='none'
                leftSection={(<IconKey style={{ width: rem(16), height: rem(16) }} />)}
                rightSection={(
                    <ActionIcon
                        type='submit'
                        variant="subtle"
                        loading={loading}>
                        <IconDeviceFloppy style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                )}
                {...form.getInputProps('apikey')} />
        </form>
    )
};

export default ApiKeyForm;