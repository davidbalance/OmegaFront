'use client'

import ReportFormDrawer from '@/components/report/report-form-drawer/ReportFormDrawer'
import ResultSettingsMenu from '@/components/report/result-settings-menu/ResultSettingsMenu'
import OmegaTable from '@/components/table/omega-table/OmegaTable'
import SortTh from '@/components/table/sort-th/SortTh'
import { useTable } from '@/hooks/useTable'
import { FindMedicalResultAndUpdateRQ, IFindService, MedicalReportService, MedicalResultService, MedicalResult as MedicalResultType } from '@/services'
import endpoints from '@/services/endpoints/endpoints'
import { Group, Table, TextInput, Title, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { IconSearch } from '@tabler/icons-react'
import React, { useLayoutEffect, useState } from 'react'

const resultService: IFindService<any, MedicalResultType> = new MedicalResultService(endpoints.RESULT.V1);
const reportService = new MedicalReportService(endpoints.MEDICAL_REPORT.V1);

type ResultData = MedicalResultType;

const MedicalReport: React.FC = () => {

    const table = useTable<ResultData>([], 50);
    const [selected, setSelected] = useState<ResultData>();

    const [tableLoading, TableDisclosure] = useDisclosure(true);
    const [openReportDisclosure, ReportDisclosure] = useDisclosure(false);

    useLayoutEffect(() => {
        load();
        return () => { }
    }, []);

    const load = async () => {
        TableDisclosure.open();
        try {
            const results = await resultService.find();
            console.log(results);
            table.setData(results);
        } catch (error) {
            console.error(error);
            notifications.show({
                title: 'Error',
                message: 'Ha ocurrido un error al obtener lo datos del servidor',
                color: 'red'
            });
        } finally {
            TableDisclosure.close();
        }
    }

    const rows = table.rows.map((row) => (
        <Table.Tr key={row.id}>
            <Table.Td>{row.examName}</Table.Td>
            <Table.Td>
                <ResultSettingsMenu
                    useFile={!!row.report && row.report.hasFile}
                    onCreateClick={() => { setSelected(row); ReportDisclosure.open() }}
                    onDownloadReportPDF={() => {
                        const report = row.report;
                        if (!!report && report.hasFile) {
                            reportService.findFile({ id: report.id, name: row.examName });
                        }
                    }} />
            </Table.Td>
        </Table.Tr>
    ));

    const header = <>
        <SortTh
            sorted={table.sortBy === 'examName'}
            reversed={table.sortDirection}
            onSort={() => table.setSorting('examName')} >
            Examen
        </SortTh>
        <Table.Th>Acciones</Table.Th>
    </>

    return (
        <>
            <ReportFormDrawer
                opened={openReportDisclosure}
                onClose={ReportDisclosure.close}
                result={selected?.id || -1}
                report={selected?.report} />

            <Group justify="space-between">
                <Title component="span" variant="text" c='omegaColors'>
                    Resultados
                </Title>
            </Group>
            <br />

            <TextInput
                placeholder="Busca cualquier campo"
                mb="md"
                leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                value={table.search}
                onChange={table.onSeach}
            />
            <OmegaTable
                loading={tableLoading}
                header={header}
                rows={rows}
                total={table.total}
                page={table.page}
                onPageChange={table.setPage} />
        </>
    )
}

export default MedicalReport