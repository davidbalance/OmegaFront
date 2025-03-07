'use client'

import { useConfirmation } from '@/contexts/confirmation.context';
import { getErrorMessage } from '@/lib/utils/errors';
import { sendMedicalOrder } from '@/server/medical_order/actions';
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import EmailSchema from './schemas/email.schema';
import { Button, rem, Select, Stack } from '@mantine/core';
import LoadingOverlay from '../_base/loading-overlay';
import { IconSend } from '@tabler/icons-react';

type OrderEmailSelectFormProps = {
    orderId: string;
    email: string[];
    defaultEmail?: string;
    onComplete?: () => void;
}
const OrderEmailSelectForm: React.FC<OrderEmailSelectFormProps> = ({
    orderId,
    email,
    defaultEmail: initialEmail,
    onComplete
}) => {

    const [state, setState] = useState<'loading' | 'default'>('default')
    const { show } = useConfirmation();

    const form = useForm<z.infer<typeof EmailSchema>>({
        initialValues: { email: initialEmail ?? '' },
        validate: zodResolver(EmailSchema)
    })

    const trigger = useCallback(async (email: string) => {
        const flag = await show(`Se va a enviar un correo a ${email}. ¿Esta seguro?`);
        if (flag) {
            setState('loading');
            try {
                await sendMedicalOrder({ orderId, email });
                onComplete?.();
            } catch (error) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setState('default');
            }
        }
    }, [orderId, onComplete, show]);

    useEffect(() => {
        if (initialEmail) {
            trigger(initialEmail);
        }
    }, [initialEmail, trigger]);

    const handleSubmit = useCallback(
        async (value: z.infer<typeof EmailSchema>): Promise<void> => {
            await trigger(value.email);
        }, [trigger]);

    return (
        <>
            <LoadingOverlay visible={state === 'loading'} />
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap={rem(8)}>
                    <Select
                        label='El correo se va a enviar a...'
                        data={email.map(e => ({ value: e, label: e }))}
                        defaultValue={initialEmail}
                        {...form.getInputProps('email')} />

                    <Button
                        fullWidth
                        size='xs'
                        type='submit'
                        leftSection={(
                            <IconSend
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5} />
                        )}>
                        Enviar
                    </Button>
                </Stack>

            </form>
        </>
    )
}

export default OrderEmailSelectForm