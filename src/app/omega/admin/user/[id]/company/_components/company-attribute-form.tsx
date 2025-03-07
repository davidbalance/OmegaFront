'use client'

import LoadingOverlay from '@/components/_base/loading-overlay';
import CorporativeSelect from '@/components/corporative-select';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { getErrorMessage } from '@/lib/utils/errors';
import { addUserAttribute } from '@/server/user_attribute/actions';
import { AddUserAttributePayload } from '@/server/user_attribute/server_types';
import { Button, Flex, rem, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

type CompanyAttributeValue = Pick<AddUserAttributePayload, 'attributeValue'>;
type CompanyAttributeFormProps = Pick<React.ComponentPropsWithRef<typeof CorporativeSelect>, 'options' | 'companyValue' | 'corporativeValue'> & {
    userId: string;
}
const CompanyAttributeForm: React.FC<CompanyAttributeFormProps> = ({
    userId,
    options,
    companyValue,
    corporativeValue
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [formValue, setFormValue] = useState<CompanyAttributeValue>({ attributeValue: '' });
    const router = useRouter();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            if (formValue.attributeValue.trim() !== '') {
                await addUserAttribute({
                    userId: userId,
                    attributeName: 'look_for_company',
                    attributeValue: formValue.attributeValue
                });
                router.back();
            } else {
                throw new Error('Debe serleccionar una empresa');
            }
        } catch (error: any) {
            notifications.show({ message: getErrorMessage(error), color: 'red' });
        } finally {
            setLoading(false);
        }
    }, [userId, formValue, router]);

    return (
        <form onSubmit={handleSubmit}>
            <LoadingOverlay visible={loading} />
            <Flex
                gap={rem(8)}
                direction='column'>
                <ModularBox>
                    <Stack gap={rem(8)}>
                        <CorporativeSelect
                            options={options}
                            companyValue={companyValue}
                            corporativeValue={corporativeValue}
                            useCompany
                            onChange={(selectedValues) => {
                                setFormValue((prev) => {
                                    const updatedForm: any = { ...prev };
                                    selectedValues.forEach(({ name, value }) => {
                                        if (name === 'companyId') {
                                            updatedForm.attributeValue = value;
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