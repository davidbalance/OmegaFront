'use client'

import React, { useCallback, useState } from 'react'
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { Button, rem, Select } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Option } from '@/lib/types/option.type';
import OrderProcessSchema from '../_schema/order-process.schema';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { IconDeviceFloppy } from '@tabler/icons-react';

type BaseOrderProcessFormProps = Omit<React.HTMLProps<HTMLFormElement>, 'ref' | 'onSubmit' | 'data'> & {
    loading?: boolean;
    processOptions: Option[];
    data: { process: string };
    onSubmit?: (data: { process: string }) => void;
};
const BaseOrderProcessForm = React.forwardRef<HTMLFormElement, BaseOrderProcessFormProps>(({
    processOptions,
    data,
    loading,
    onSubmit,
    ...props
}, ref) => {


    const [formValue, setFormValue] = useState<{ process: string }>({
        process: data?.process ?? '',
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
        (event) => {
            event.preventDefault();
            const safeValues = OrderProcessSchema.safeParse(formValue);
            if (safeValues.error) {
                notifications.show({ message: JSON.stringify(safeValues.error.errors), color: 'red' });
                return;
            }
            onSubmit?.(safeValues.data);
        }, [formValue, onSubmit]);

    return (
        <form
            ref={ref}
            onSubmit={handleSubmit}
            {...props}>
            <ModularLayout>
                <ModularBox flex={1}>
                    <Select
                        data={processOptions}
                        checkIconPosition="left"
                        label="Proceso"
                        placeholder="Post-Ocupacional"
                        defaultDropdownOpened={false}
                        maxDropdownHeight={200}
                        name='process'
                        defaultValue={data?.process}
                        onChange={(_, e) => setFormValue(prev => ({ ...prev, process: e.value }))}
                    />
                </ModularBox>
                <ModularBox>
                    <Button
                        loading={loading}
                        fullWidth
                        flex={1}
                        size='xs'
                        type="submit"
                        leftSection={(
                            <IconDeviceFloppy
                                style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                        )}>
                        Guardar
                    </Button>
                </ModularBox>
            </ModularLayout>
        </form>
    )
});

BaseOrderProcessForm.displayName = 'BaseOrderProcessForm';

export default BaseOrderProcessForm