'use client'

import React, { useState } from "react"
import { useDisclosure } from '@mantine/hooks';
import DeleteRoleDialog from "@/components/role/delete-role-dialog/DeleteRoleDialog";
import { RoleLayout } from "@/components/role/role-layout/RoleLayout"
import { useRole } from "@/hooks"
import CreateRoleFormDrawer from "@/components/role/create-role-form-drawer/CreateRoleFormDrawer";
import { useResource } from "@/hooks/useResources";

enum LayoutStates {
    DEFAULT,
    CREATE
}

const Role: React.FC = () => {

    const roleHook = useRole(true);
    const resourceHook = useResource(true);

    const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);

    const [deleteState, DeleteDisclosure] = useDisclosure();

    const handleCreateEvent = () => { setCurrentState(LayoutStates.CREATE); }

    const handleClose = () => {
        resourceHook.clearSelected();

        resourceHook.find();
        setCurrentState(LayoutStates.DEFAULT);
    }

    const rows = table.rows.map((row) => (
        <Table.Tr key={row.id}>
            <Table.Td>{row.name}</Table.Td>
            <Table.Tr>
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
            </Table.Tr>
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