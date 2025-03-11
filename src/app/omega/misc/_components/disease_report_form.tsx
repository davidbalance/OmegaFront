'use client'

import LoadingOverlay from '@/components/_base/loading-overlay';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { Option } from '@/lib/types/option.type';
import { CorporativeOption } from '@/server/corporative/server_types';
import { MedicalDiseaseReportQuery } from '@/server/medical_test/server_types';
import { Box, Button, rem, Select, SimpleGrid } from '@mantine/core'
import { IconFileSpreadsheet } from '@tabler/icons-react';
import React, { useCallback, useState } from 'react'
import CorporativeSelect from '@/components/corporative-select';
import dayjs from 'dayjs';
import { notifications } from '@mantine/notifications';
import { blobFile } from '@/lib/utils/blob-to-file';
import { getErrorMessage } from '@/lib/utils/errors';

const processBlob = async (body: MedicalDiseaseReportQuery) => {
    const response = await fetch(`/api/medical/disease/report`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'content-type': 'application/json' }
    });
    if (!response.ok) {
        const reason = await response.json();
        console.error(reason);
        throw new Error(getErrorMessage(reason));
    }
    const blob = await response.blob();
    blobFile(blob, `${dayjs().format('YYYY_MM_DD_HH:mm:ss')}.xlsx`)
}

type DiseaseReportFormValue = MedicalDiseaseReportQuery;
type DiseaseReportFormProps = {
    yearOptions: Option[];
    corporativeOptions: CorporativeOption[];
}
const DiseaseReportForm: React.FC<DiseaseReportFormProps> = ({
    yearOptions,
    corporativeOptions
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<DiseaseReportFormValue>({});

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
        async (event) => {
            event.preventDefault();

            setLoading(true);
            if (Object.values(formValues).filter(Boolean).length <= 0) {
                notifications.show({ message: 'Debe seleccionar al menos una opcion para descargar el archivo.', color: 'red' });
                return;
            }
            try {
                await processBlob(formValues);
            } catch (error: any) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [formValues]);

    return (
        <ModularBox>
            <LoadingOverlay visible={loading} />
            <form onSubmit={handleSubmit}>
                <SimpleGrid
                    cols={{ sm: 1, md: 3 }}
                    spacing={rem(8)}>
                    <Select
                        name='year'
                        data={yearOptions}
                        onChange={(_, option) => setFormValues(prev => ({ ...prev, orderYear: option ? parseInt(option.value) : undefined }))}
                        checkIconPosition="left"
                        label="Año"
                        placeholder="Escoge un año"
                        searchable
                        clearable
                        defaultDropdownOpened={false}
                        nothingFoundMessage="Año no encontrado..."
                        maxDropdownHeight={200}
                    />

                    <CorporativeSelect
                        onChange={(selectedValues) => {
                            setFormValues(prev => {
                                const updatedForm: any = { ...prev };
                                selectedValues.forEach(({ name, label }) => {
                                    if (name === 'corporativeId') updatedForm.locationCorporative = label;
                                    if (name === 'companyId') updatedForm.locationCompany = label;
                                });
                                return updatedForm;
                            })
                        }}
                        useCompany
                        options={corporativeOptions} />
                </SimpleGrid>
                <Button
                    mt='sm'
                    type='submit'
                    fullWidth
                    size='xs'
                    loading={loading}
                    leftSection={(
                        <IconFileSpreadsheet style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    )}>
                    Exportar
                </Button>
            </form>
        </ModularBox>
    )
}

export default DiseaseReportForm