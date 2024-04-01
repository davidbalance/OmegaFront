'use client'

import CreateDiseaseGroupDrawer from '@/components/disease-group/create-disease-group-drawer/CreateDiseaseGroupDrawer'
import DeleteDiseaseGroupDialog from '@/components/disease-group/delete-disease-group-dialog/DeleteDiseaseGroup'
import UpdateDiseaseGroupDrawer from '@/components/disease-group/update-disease-group-drawer/UpdateDiseaseGroupDrawer'
import OmegaTable from '@/components/table/omega-table/OmegaTable'
import SortTh from '@/components/table/sort-th/SortTh'
import UserSettingsMenu from '@/components/user/user-settings-menu/UserSettingsMenu'
import { useTable } from '@/hooks/useTable'
import { DiseaseGroupService, DiseaseGroup as DiseaseGroupType, IFindService } from '@/services'
import endpoints from '@/services/endpoints/endpoints'
import { Group, Title, Center, ActionIcon, rem, Table, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconCirclePlus, IconSearch } from '@tabler/icons-react'
import React, { useLayoutEffect, useState } from 'react'

const diseaseService: IFindService<any, DiseaseGroupType> = new DiseaseGroupService(endpoints.DISEASE_GROUP.V1);

type DiseaseGroupData = DiseaseGroupType;
const DiseaseGroup: React.FC = () => {

    const [selected, setSelected] = useState<DiseaseGroupData | undefined>(undefined);

    const table = useTable<DiseaseGroupData>([], 50);

    const [tableLoading, TableDisclosure] = useDisclosure(true);
    const [openCreateForm, CreateFormDisclosure] = useDisclosure(false);
    const [openModifyForm, ModifyFormDisclosure] = useDisclosure(false);
    const [openDeleteForm, DeleteFormDisclosure] = useDisclosure(false);

    useLayoutEffect(() => {
        load();
        return () => { }
    }, [])

    const load = async () => {
        try {
            TableDisclosure.open();
            const groups = await diseaseService.find();
            table.setData(groups);
        } catch (error) {

        } finally {
            TableDisclosure.close();
        }
    }

    const header = <>
        <SortTh
            sorted={table.sortBy === 'name'}
            reversed={table.sortDirection}
            onSort={() => table.setSorting('name')} >
            Grupo
        </SortTh>
        <Table.Th>Acciones</Table.Th>
    </>

    const rows = table.rows.map((row) => (
        <Table.Tr key={row.id}>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>
                <UserSettingsMenu
                    onModification={() => { setSelected(row); ModifyFormDisclosure.open(); }}
                    // onDelete={() => { setSelected(row); DeleteFormDisclosure.open(); }}
                />
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <CreateDiseaseGroupDrawer
                opened={openCreateForm}
                onClose={CreateFormDisclosure.close} />

            <UpdateDiseaseGroupDrawer
                opened={openModifyForm}
                onClose={ModifyFormDisclosure.close}
                disease={selected!} />

            <DeleteDiseaseGroupDialog
                opened={openDeleteForm}
                onClose={DeleteFormDisclosure.close}
                onComplete={(id: number) => { }} />

            <Group justify="space-between">
                <Title component="span" variant="text" c='omegaColors'>
                    Grupo de Morbilidades
                </Title>
                <Center>
                    <ActionIcon
                        variant="transparent"
                        onClick={CreateFormDisclosure.open}>
                        <IconCirclePlus
                            style={{ width: rem(64), height: rem(64) }}
                            stroke={1.5} />
                    </ActionIcon>
                </Center>
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

export default DiseaseGroup