import { Header } from '@/components/header/Header'
import { OmegaTable } from '@/components/table'
import OmegaTh from '@/components/table/omega-th/OmegaTh'
import { useTable } from '@/hooks'
import { MedicalResult, MedicalResultOrder } from '@/services/api/medical-result/dtos'
import { Table, TextInput, rem } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import React, { useEffect } from 'react'
import { MedicalResultSettings } from '../medical-result-settings/MedicalResultSettings'
import { useMedicalReport } from '@/hooks/useMedicalReport'
import { SearchInputText } from '@/components/input/SearchInputText'

type MedicalResultLayoutDataType = Omit<MedicalResult, 'order'> & MedicalResultOrder;
const parseResult = (medicalResults: MedicalResult[]): MedicalResultLayoutDataType[] => medicalResults.map<MedicalResultLayoutDataType>((e) => ({ ...e, ...e.order }));

type MedicalResultLayoutProps = {
    load: boolean;
    medicalResults: MedicalResult[];
    events: {
        onCreate: (index: number) => void;
    }
}

const MedicalResultLayout: React.FC<MedicalResultLayoutProps> = ({ load, medicalResults, events }) => {

    const tableHook = useTable<MedicalResultLayoutDataType>(parseResult(medicalResults), 50);
    const medicalReportHook = useMedicalReport();

    useEffect(() => {
        tableHook.setData(parseResult(medicalResults));
        return () => { }
    }, [medicalResults]);

    const header = <>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('examName'), sorted: tableHook.sortBy === 'examName' }} >Examen Médico</OmegaTh>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('patientFullname'), sorted: tableHook.sortBy === 'patientFullname' }} >Paciente</OmegaTh>
        <OmegaTh>Acciones</OmegaTh>
    </>

    const rows = tableHook.rows.map((row, index) => (
        <Table.Tr key={row.id}>
            <Table.Td>{row.examName}</Table.Td>
            <Table.Td>{row.patientFullname}</Table.Td>
            <Table.Td>
                <MedicalResultSettings
                    onCreate={() => events.onCreate(index)}
                    onDownload={!!row.report ? () => {
                        if (row.report?.hasFile) {
                            medicalReportHook.findMedicalReport({
                                id: row.report.id,
                                name: row.examName
                            })
                        }
                    } : undefined}
                />
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Header>
                Listado de resultados medicos
            </Header>

            <SearchInputText
                placeholder="Buscar"
                value={tableHook.search}
                onChange={tableHook.onSearch}
            />

            <OmegaTable
                loading={load}
                header={header}
                rows={rows}
                total={tableHook.total}
                page={tableHook.page}
                onPageChange={tableHook.setPage} />
        </>
    )
}

export { MedicalResultLayout }