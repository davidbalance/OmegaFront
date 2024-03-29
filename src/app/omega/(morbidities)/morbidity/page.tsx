'use client'

import CreateMorbidityDrawer from '@/components/morbidity/create-morbidity-drawer/CreateMorbidityDrawer';
import DeleteMorbidityDialog from '@/components/morbidity/delete-morbidity-dialog/DeleteMorbidityDialog';
import UpdateMorbidityDrawer from '@/components/morbidity/update-morbidity-drawer/UpdateMorbidityDrawer';
import OmegaTable from '@/components/table/omega-table/OmegaTable';
import SortTh from '@/components/table/sort-th/SortTh';
import UserSettingsMenu from '@/components/user/user-settings-menu/UserSettingsMenu';
import { useTable } from '@/hooks/useTable';
import { MorbidityGroupModel, MorbidityModel, MorbidityViewService } from '@/services';
import { Group, Title, Center, ActionIcon, rem, Table, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { IconCirclePlus, IconSearch } from '@tabler/icons-react'
import React, { useLayoutEffect, useState } from 'react'

type MorbidityData = MorbidityModel;
const Morbidity: React.FC = () => {
    const morbidityView = new MorbidityViewService();

    const [selected, setSelected] = useState<MorbidityData | undefined>(undefined);
    const [groups, setGroups] = useState<MorbidityGroupModel[]>([]);

    const table = useTable<MorbidityData>([], 50);

    const tableLoader = useDisclosure(true);
    const createDisclosure = useDisclosure(false);
    const modifyDisclosure = useDisclosure(false);
    const deleteDisclosure = useDisclosure(false);

    useLayoutEffect(() => {
        loadConfiguration();
        return () => { }
    }, [])

    const loadConfiguration = async () => {
        try {
            tableLoader[1].open();
            const { morbidities, groups } = await morbidityView.initialConfiguration();
            table.setData(morbidities);
            setGroups(groups);
        } catch (error) {

        } finally {
            tableLoader[1].close();
        }
    }

    const header = <>
        <SortTh sorted={table.sortBy === 'name'} reversed={table.reverseSortDirection} onSort={() => table.setSorting('name')} >Morbilidades</SortTh>
        <Table.Th>Acciones</Table.Th>
    </>

    const rows = table.rows.map((row) => (
        <Table.Tr key={row.id}>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>
                <UserSettingsMenu
                    onModification={() => {
                        setSelected(row);
                        modifyDisclosure[1].open();
                    }}
                    onDelete={() => {
                        setSelected(row);
                        deleteDisclosure[1].open();
                    }}
                />
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <CreateMorbidityDrawer
                groups={groups}
                opened={createDisclosure[0]}
                onClose={createDisclosure[1].close} />

            <UpdateMorbidityDrawer
                groups={groups}
                opened={modifyDisclosure[0]}
                onClose={modifyDisclosure[1].close}
                data={selected} />

            <DeleteMorbidityDialog
                opened={deleteDisclosure[0]}
                onClose={deleteDisclosure[1].close}
                onComplete={(id: number) => { }} />

            <Group justify="space-between">
                <Title component="span" variant="text" c='omegaColors'>
                    Morbilidades
                </Title>
                <Center>
                    <ActionIcon
                        variant="transparent"
                        onClick={createDisclosure[1].open}>
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
                loading={tableLoader[0]}
                header={header}
                rows={rows}
                total={table.total}
                page={table.activePage}
                onPageChange={table.setPage} />
        </>
    )
}

export default Morbidity