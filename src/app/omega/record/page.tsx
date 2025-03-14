import CreateButton from '@/components/_base/create-button';
import ListRoot from '@/components/_base/list/list-root';
import Title from '@/components/_base/mantine/title';
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root';
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section';
import ReloadButton from '@/components/_base/reload-button';
import RemoveQueryButton from '@/components/_base/remove-query-button';
import Search from '@/components/_base/search';
import ServerPagination from '@/components/_base/server-pagination';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import PatientHeader from '@/components/patient-header';
import PatientList from '@/components/patient_list';
import { retriveClients } from '@/server/medical_client/actions';
import { retriveClientRecords } from '@/server/record/actions';
import { ClientRecord } from '@/server/record/server-types';
import { ActionIcon, Flex, Group, Menu, MenuDropdown, MenuItem, MenuTarget, rem } from '@mantine/core';
import React from 'react'
import RecordHeader from './_components/record-header';
import RecordList from './_components/record-list';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import RecordCreate from './_components/record-create';

const take: number = 100;
type OmegaRecordPages = {
    searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaRecordPages: React.FC<OmegaRecordPages> = async ({
    searchParams
}) => {
    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const owner = typeof searchParams.owner === 'string' ? searchParams.owner : undefined;
    const orderingValue = typeof searchParams.order === 'string' ? searchParams.order : undefined;


    const patientActive = typeof searchParams.patient === 'string' ? searchParams.patient : undefined;
    const patientSearch = typeof searchParams.patientSearch === 'string' ? searchParams.patientSearch : undefined;
    const patientField = owner === 'patient' ? field : undefined;
    const patientPage = typeof searchParams.patientPage === 'string' ? Number(searchParams.patientPage) : 1;

    const recordSearch = typeof searchParams.recordSearch === 'string' ? searchParams.recordSearch : undefined;

    const patientValue = await retriveClients({
        filter: patientSearch,
        orderField: patientField as any,
        orderValue: orderingValue as any,
        skip: patientPage - 1,
        limit: take
    });
    const totalPatientPage = Math.floor(patientValue.amount / take);

    const recordValues: ClientRecord[] = patientActive
        ? await retriveClientRecords({
            patientDni: patientActive,
            filter: recordSearch,
        })
        : [];


    return (
        <MultipleLayerRoot>
            <MultipleLayerSection active={!patientActive}>
                <ModularLayout>
                    <ModularBox>
                        <Flex
                            justify='space-between'
                            wrap='nowrap'
                            gap={rem(16)}>
                            <Title order={4} component='span'>Pacientes</Title>
                            <Group gap={rem(4)}>
                                <ReloadButton />
                            </Group>
                        </Flex>
                    </ModularBox>
                    <ModularBox>
                        <Search
                            query='patientSearch'
                            value={patientSearch}
                            removeQueries={['field', 'owner', 'order', 'patient', 'patientPage', 'recordSearch']} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <PatientHeader />
                            <PatientList
                                action
                                active={patientActive}
                                patients={patientValue.data}
                                removeQueries={['recordSearch']} />
                        </ListRoot>
                    </ModularBox>
                    {totalPatientPage > 1 && (
                        <ModularBox>
                            <ServerPagination
                                queryKey='patientPage'
                                page={patientPage}
                                total={totalPatientPage} />
                        </ModularBox>)}
                </ModularLayout>
            </MultipleLayerSection>
            <MultipleLayerSection active={!!patientActive}>
                <ModularLayout>
                    <ModularBox>
                        <Flex
                            justify='space-between'
                            wrap='nowrap'
                            gap={rem(16)}>
                            <Title order={4} component='span'>Fichas medicas</Title>
                            <Group gap={rem(4)}>
                                {!!patientActive && <RecordCreate patientDni={patientActive} />}
                                <ReloadButton />
                                <RemoveQueryButton
                                    queries={['patient']}
                                    hiddenFrom='md' />
                            </Group>
                        </Flex>
                    </ModularBox>
                    <ModularBox>
                        <Search
                            query='recordSearch'
                            value={recordSearch} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <RecordHeader />
                            <RecordList records={recordValues} />
                        </ListRoot>
                    </ModularBox>
                </ModularLayout>
            </MultipleLayerSection>
        </MultipleLayerRoot>
    )
}

export default OmegaRecordPages