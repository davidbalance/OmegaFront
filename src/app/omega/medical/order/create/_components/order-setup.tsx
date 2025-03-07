'use client'

import React, { useCallback, useMemo, useState } from 'react'
import ModularLayout from '@/components/modular/layout/ModularLayout';
import OrderSetupSchema from '../_schema/order_setup.schema';
import { Box, Select, SimpleGrid } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { CreateMedicalOrderPayload } from '@/server/medical_order/server_types';
import { CorporativeOption } from '@/server/corporative/server_types';
import { Option } from '@/lib/types/option.type';
import CoporativeSelect from '@/components/corporative-select';

export type OrderFormSetupValue = Pick<CreateMedicalOrderPayload, 'branchName' | 'companyName' | 'companyRuc' | 'corporativeName' | 'process'>;

type OrderSetupProps = Omit<React.HTMLProps<HTMLFormElement>, 'ref' | 'onSubmit'> & {
    corporativeOptions: CorporativeOption[];
    processOptions: Option[];
    data?: OrderFormSetupValue,
    onSubmit?: (data: OrderFormSetupValue) => void;
};
const OrderSetup = React.forwardRef<HTMLFormElement, OrderSetupProps>(({
    corporativeOptions,
    processOptions,
    data,
    onSubmit,
    ...props
}, ref) => {


    const [formValue, setFormValue] = useState<OrderFormSetupValue>({
        corporativeName: data?.corporativeName ?? '',
        companyName: data?.companyName ?? '',
        companyRuc: data?.companyRuc ?? '',
        branchName: data?.branchName ?? '',
        process: data?.process ?? '',
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
        (event) => {
            event.preventDefault();
            const safeValues = OrderSetupSchema.safeParse(formValue);
            if (safeValues.error) {
                notifications.show({ message: JSON.stringify(safeValues.error.errors), color: 'red' });
                return;
            }
            onSubmit?.(safeValues.data);
        }, [formValue, onSubmit]);

    const defaultCorporative = useMemo(() => corporativeOptions.find(e => e.label === data?.corporativeName), [data, corporativeOptions]);
    const defaultCompany = useMemo(() => defaultCorporative?.children.find(e => e.value === data?.companyRuc), [data, defaultCorporative]);
    const defaultBranch = useMemo(() => defaultCompany?.children.find(e => e.label === data?.branchName), [data, defaultCompany]);

    return (
        <form
            ref={ref}
            onSubmit={handleSubmit}
            {...props}>
            <ModularLayout>
                <SimpleGrid cols={{ base: 1, sm: 3 }}>
                    <CoporativeSelect
                        options={corporativeOptions}
                        corporativeValue={defaultCorporative?.value}
                        companyValue={defaultCompany?.value}
                        branchValue={defaultBranch?.value}
                        useCompany
                        useBranch
                        onChange={(selectedValues) => {
                            setFormValue((prev) => {
                                const updatedForm: any = { ...prev };
                                selectedValues.forEach(({ name, label, value }) => {
                                    if (name === 'branchId') {
                                        updatedForm.branchName = label;
                                    }
                                    else if (name === 'companyId') {
                                        updatedForm.companyRuc = value;
                                        updatedForm.companyName = label;
                                    }
                                    else if (name === 'corporativeId') {
                                        updatedForm.corporativeName = label;
                                    }
                                });
                                return updatedForm;
                            });
                        }} />
                </SimpleGrid>
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
            </ModularLayout>
        </form>
    )
});

OrderSetup.displayName = 'OrderSetup';

export default OrderSetup