'use client'

import LoadingOverlay from '@/components/_base/loading-overlay';
import CorporativeSelect from '@/components/corporative-select';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { getErrorMessage } from '@/lib/utils/errors';
import { addUserCompanyFilter } from '@/server';
import { AddUserCompanyFilterPayload, UserCompanyFilter } from '@/server/user-attribute/server-types';
import { Button, Flex, rem, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useCallback, useState } from 'react'

type CompanyAttributeValue = Pick<AddUserCompanyFilterPayload, 'companyId' | 'companyRuc' | 'corporativeId' | 'corporativeName'>;
type CompanyAttributeFormProps = Pick<React.ComponentPropsWithRef<typeof CorporativeSelect>, 'options'> & {
    userId: string;
    filter: UserCompanyFilter[]
}

const DEFAULT_FORM_VALUE: CompanyAttributeValue = { companyId: "", companyRuc: "", corporativeId: "", corporativeName: "" }
const CompanyAttributeForm: React.FC<CompanyAttributeFormProps> = ({
    userId,
    filter,
    options
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [formValue, setFormValue] = useState<CompanyAttributeValue>(DEFAULT_FORM_VALUE);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            if (
                formValue.companyId.trim() === '' ||
                formValue.companyRuc.trim() === '' ||
                formValue.corporativeId.trim() === '' ||
                formValue.corporativeName.trim() === ''
            )
                throw new Error('Debe serleccionar una empresa');

            if (
                filter.some(e =>
                    e.companyId === formValue.companyId &&
                    e.companyRuc === formValue.companyRuc &&
                    e.corporativeId === formValue.corporativeId &&
                    e.corporativeName === formValue.corporativeName)
            )
                throw new Error('Item ya existente, seleccione otro');


            await addUserCompanyFilter({
                companyId: formValue.companyId,
                companyRuc: formValue.companyRuc,
                corporativeId: formValue.corporativeId,
                corporativeName: formValue.corporativeName,
                userId: userId
            })
            setFormValue(DEFAULT_FORM_VALUE)
        } catch (error: any) {
            notifications.show({ message: getErrorMessage(error), color: 'red' });
        } finally {
            setLoading(false);
        }
    }, [userId, formValue, filter]);

    return (
        <form onSubmit={handleSubmit}>
            <LoadingOverlay visible={loading} />
            <Flex
                gap={rem(8)}
                direction='column'>
                <ModularBox>
                    <Stack gap={rem(8)}>
                        <CorporativeSelect
                            clean={formValue === DEFAULT_FORM_VALUE}
                            options={options}
                            useCompany
                            onChange={(selectedValues) => {
                                setFormValue((prev) => {
                                    const updatedForm: any = { ...prev };
                                    selectedValues.forEach(({ name, value, label }) => {
                                        if (name === 'corporativeId') {
                                            updatedForm.corporativeId = value;
                                            updatedForm.corporativeName = label;
                                            updatedForm.companyId = ""
                                            updatedForm.companyRuc = ""
                                        }
                                        if (name === 'companyId') {
                                            updatedForm.companyId = value.split("--")[0];
                                            updatedForm.companyRuc = value.split("--")[1];
                                        }
                                    });
                                    return updatedForm;
                                });
                            }} />
                    </Stack>
                </ModularBox>
                <ModularBox>
                    <Button
                        mt={rem(8)}
                        size='xs'
                        fullWidth
                        type='submit'
                        loading={loading}
                        leftSection={(
                            <IconDeviceFloppy style={{
                                width: rem(16),
                                height: rem(16)
                            }} stroke={1.5} />
                        )}>
                        Guardar
                    </Button>
                </ModularBox>
            </Flex>
        </form>
    )
}

export default CompanyAttributeForm