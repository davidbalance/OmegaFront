import ListRoot from '@/components/_base/list/list-root'
import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import ListTh from '@/components/_base/list/list-th'
import ListThead from '@/components/_base/list/list-thead'
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root'
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section'
import OrderableButton from '@/components/_base/orderable-button'
import ReloadButton from '@/components/_base/reload-button'
import RemoveQueryButton from '@/components/_base/remove-query-button'
import Search from '@/components/_base/search'
import ServerPagination from '@/components/_base/server-pagination'
import { ModularBox } from '@/components/modular/box/ModularBox'
import ModularLayout from '@/components/modular/layout/ModularLayout'
import { Box, Flex, Group, rem, Text, Title } from '@mantine/core'
import React from 'react'

interface PatientPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

const PatientPage: React.FC<PatientPageProps> = ({ searchParams }) => {

    const patientSearch = typeof searchParams.patientSearch === 'string' ? searchParams.patientSearch : undefined;
    const patientOrder = typeof searchParams.patientOrder === 'string' ? searchParams.patientOrder : undefined;
    const patientPage = typeof searchParams.patientPage === 'string' ? Number(searchParams.patientPage) : 1;

    const morderSearch = typeof searchParams.morderSearch === 'string' ? searchParams.morderSearch : undefined;
    const morderOrder = typeof searchParams.morderOrder === 'string' ? searchParams.morderOrder : undefined;

    const mresultSearch = typeof searchParams.mresultSearch === 'string' ? searchParams.mresultSearch : undefined;
    const mresultOrder = typeof searchParams.mresultOrder === 'string' ? searchParams.mresultOrder : undefined;

    return (
        <>
            <MultipleLayerRoot>
                <MultipleLayerSection active>
                    <ModularLayout>
                        <ModularBox>
                            <Flex
                                justify='space-between'
                                wrap='nowrap'
                                gap={rem(16)}>
                                <Box style={{ flexShrink: 0 }}>
                                    <Title order={4} component='span'>Pacientes</Title>
                                </Box>
                                <Group gap={rem(4)}>
                                    <ReloadButton />
                                    <RemoveQueryButton
                                        queries={['patientSearch', 'patientOrder', 'patientPage']}
                                        hiddenFrom='md' />
                                </Group>
                            </Flex>
                        </ModularBox>
                        <ModularBox>
                            <Search queryKey='patientSearch' value={patientSearch} />
                        </ModularBox>
                        <ModularBox flex={1}>
                            <ListRoot>
                                <ListThead>
                                    <ListTh>
                                        <OrderableButton queryKey='patientOrder' order={patientOrder} field='dni'>
                                            <Text>Cedula</Text>
                                        </OrderableButton>
                                    </ListTh>
                                    <ListTh>
                                        <OrderableButton queryKey='patientOrder' order={patientOrder} field='name'>
                                            <Text>Nombre</Text>
                                        </OrderableButton>
                                    </ListTh>
                                    <ListTh>
                                        <OrderableButton queryKey='patientOrder' order={patientOrder} field='lastname'>
                                            <Text>Apellido</Text>
                                        </OrderableButton>
                                    </ListTh>
                                </ListThead>
                                <ListTbody>
                                    {[...Array(40)].map((e, i) => (
                                        <ListRow hoverable={true} key={e}>
                                            {i}
                                        </ListRow>
                                    ))}
                                </ListTbody>
                            </ListRoot>
                        </ModularBox>
                        <ModularBox>
                            <ServerPagination
                                queryKey='patientPage'
                                page={patientPage}
                                total={10} />
                        </ModularBox>
                    </ModularLayout>
                </MultipleLayerSection>
                <MultipleLayerSection>
                    <ModularLayout>
                        <ModularBox>
                            <Flex
                                justify='space-between'
                                wrap='nowrap'
                                gap={rem(16)}>
                                <Box style={{ flexShrink: 0 }}>
                                    <Title order={4} component='span'>Ordenes medicas</Title>
                                </Box>
                                <ReloadButton />
                            </Flex>
                        </ModularBox>
                        <ModularBox>
                            <Search queryKey='morderSearch' value={morderSearch} />
                        </ModularBox>
                        <ModularBox flex={1}>
                            <ListRoot>
                                <ListThead>
                                    <ListTh>
                                        <OrderableButton queryKey='morderOrder' order={morderOrder} field='process'>
                                            <Text>Proceso</Text>
                                        </OrderableButton>
                                    </ListTh>
                                    <ListTh>
                                        <OrderableButton queryKey='morderOrder' order={morderOrder} field='createAt'>
                                            <Text>Fecha de creacion</Text>
                                        </OrderableButton>
                                    </ListTh>
                                </ListThead>
                                <ListTbody>
                                    {[...Array(40)].map((e, i) => (
                                        <ListRow hoverable={true} key={e}>
                                            {i}
                                        </ListRow>
                                    ))}
                                </ListTbody>
                            </ListRoot>
                        </ModularBox>
                    </ModularLayout>
                </MultipleLayerSection>
                <MultipleLayerSection>
                    <ModularLayout>
                        <ModularBox>
                            <Flex
                                justify='space-between'
                                wrap='nowrap'
                                gap={rem(16)}>
                                <Box style={{ flexShrink: 0 }}>
                                    <Title order={4} component='span'>Resultados medicos</Title>
                                </Box>
                                <ReloadButton />
                            </Flex>
                        </ModularBox>
                        <ModularBox>
                            <Search queryKey='mresultSearch' value={mresultSearch} />
                        </ModularBox>
                        <ModularBox flex={1}>
                            <ListRoot>
                                <ListThead>
                                    <ListTh>
                                        <OrderableButton queryKey='mresultOrder' order={mresultOrder} field='examName'>
                                            <Text>Examen medico</Text>
                                        </OrderableButton>
                                    </ListTh>
                                </ListThead>
                                <ListTbody>
                                    {[...Array(40)].map((e, i) => (
                                        <ListRow hoverable={true} key={e}>
                                            {i}
                                        </ListRow>
                                    ))}
                                </ListTbody>
                            </ListRoot>
                        </ModularBox>
                    </ModularLayout>
                </MultipleLayerSection>
            </MultipleLayerRoot >
        </>
    )
}

export default PatientPage