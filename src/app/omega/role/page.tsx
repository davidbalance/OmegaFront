'use client'

import CreateRoleFormDrawer from '@/components/role/create-role-form-drawer/CreateRoleFormDrawer'
import DeleteRoleDialog from '@/components/role/delete-role-dialog/DeleteRoleDialog'
import RoleSettingsMenu from '@/components/role/role-settings-menu/RoleSettingsMenu'
import UpdateRoleFormDrawer from '@/components/role/update-role-form-drawer/UpdateRoleFormDrawer'
import OmegaTable from '@/components/table/omega-table/OmegaTable'
import { OmegaTd } from '@/components/table/omega-td/OmegaTd'
import SortTh from '@/components/table/sort-th/SortTh'
import { useTable } from '@/hooks/useTable'
import { PermissionModel, RoleModel } from '@/services'
import { RoleViewService } from '@/services/view/role-view.service'
import { Group, Title, rem, TextInput, Table, ActionIcon, Center } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconCirclePlus, IconSearch } from '@tabler/icons-react'
import React, { useLayoutEffect, useState } from 'react'

type RoleData = RoleModel;
const Role: React.FC = () => {

    const roleViewService = new RoleViewService();

    const [selected, setSelected] = useState<RoleData | undefined>(undefined);
    const [permissions, setPermissions] = useState<PermissionModel[]>([]);

    const table = useTable<RoleData>([], 50);

    const tableLoader = useDisclosure(true);
    const createRoleDisclosure = useDisclosure(false);
    const deleteRoleDisclosure = useDisclosure(false);
    const modifyRoleDisclosure = useDisclosure(false);

    useLayoutEffect(() => {
        loadConfiguration();
        return () => { }
    }, [])

    const loadConfiguration = async () => {
        try {
            tableLoader[1].open();
            const { roles, permissions } = await roleViewService.initialConfiguration();
            table.setData(roles);
            setPermissions(permissions);
        } catch (error) {

        } finally {
            tableLoader[1].close();
        }
    }

    const rows = table.rows.map((row) => (
        <Table.Tr key={row.id}>
            <OmegaTd>{row.name}</OmegaTd>
            <OmegaTd>
                <RoleSettingsMenu
                    onModification={() => {
                        setSelected(row);
                        modifyRoleDisclosure[1].open();
                    }}
                    onDelete={() => {
                        setSelected(row);
                        deleteRoleDisclosure[1].open();
                    }}
                />
            </OmegaTd>
        </Table.Tr>
    ));

    const header = <>
        <SortTh sorted={table.sortBy === 'name'} reversed={table.reverseSortDirection} onSort={() => table.setSorting('name')} >Rol</SortTh>
        <Table.Th>Acciones</Table.Th>
    </>

    return (
        <>
            <CreateRoleFormDrawer
                opened={createRoleDisclosure[0]}
                onClose={createRoleDisclosure[1].close}
                permssions={permissions || []}
                onComplete={(data: RoleModel) => { }} />

            <UpdateRoleFormDrawer
                opened={modifyRoleDisclosure[0]}
                onClose={modifyRoleDisclosure[1].close}
                permssions={permissions || []}
                onComplete={(data: RoleModel) => { }} />

            <DeleteRoleDialog
                opened={deleteRoleDisclosure[0]}
                onClose={deleteRoleDisclosure[1].close}
                roleIdentify={(selected) ? selected.id : -1}
                onComplete={(id: number) => { }} />

            <Group justify="space-between">
                <Title component="span" variant="text" c='omegaColors'>
                    Roles y Permisos
                </Title>
                <Center>
                    <ActionIcon
                        variant="transparent"
                        onClick={createRoleDisclosure[1].open}>
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

export default Role