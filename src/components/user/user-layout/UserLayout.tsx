import { Header } from '@/components/header/Header';
import { OmegaTable } from '@/components/table';
import OmegaTh from '@/components/table/omega-th/OmegaTh';
import { useTable } from '@/hooks';
import { User } from '@/services/api/user/dtos';
import { ActionIcon, Button, Flex, Grid, Table, Tooltip, rem } from '@mantine/core';
import React, { useEffect } from 'react'
import UserSettingsMenu from '../user-settings-menu/UserSettingsMenu';
import { SearchInputText } from '@/components/input/SearchInputText';
import { OmegaTd } from '@/components/table/omega-td/OmegaTd';
import { ModularBox } from '@/components/modular-box/ModularBox';
import { IconCirclePlus, IconPlus } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import endpoints from '@/services/endpoints/endpoints';
import { CrudOptions } from '@/hooks/useCrud';

type UserLayoutProps = {
    users: User[];
    events: {
        onCreate: () => void;
        onModification: (index: number) => void;
        onConfiguration: (index: number) => void;
        onChangePassword: (index: number) => void;
        onDelete: (index: number) => void;
    },
    load?: boolean
}

const UserLayout: React.FC<UserLayoutProps> = ({ users, events, load = false }) => {

    const match = useMediaQuery('(max-width: 700px)');

    const tableHook = useTable<User>([], 50);

    useEffect(() => {
        if (users) {
            tableHook.setData(users);
        }
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users]);

    const header = <>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('dni'), sorted: tableHook.sortBy === 'dni' }} >CI</OmegaTh>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('name'), sorted: tableHook.sortBy === 'name' }} >Nombre</OmegaTh>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('lastname'), sorted: tableHook.sortBy === 'lastname' }} >Apellido</OmegaTh>
        <OmegaTh sort={{ onSort: () => tableHook.setSorting('email'), sorted: tableHook.sortBy === 'email' }} >Correo Electronico</OmegaTh>
        <OmegaTh>Acciones</OmegaTh>
    </>

    const rows = tableHook.rows.map((row, index) => (
        <Table.Tr key={row.id}>
            <OmegaTd>{row.dni}</OmegaTd>
            <OmegaTd>{row.name}</OmegaTd>
            <OmegaTd>{row.lastname}</OmegaTd>
            <OmegaTd>{row.email}</OmegaTd>
            <OmegaTd>
                <UserSettingsMenu
                    onModification={() => events.onModification(index)}
                    onConfiguration={() => events.onConfiguration(index)}
                    onChangePassword={() => events.onChangePassword(index)}
                    onDelete={() => events.onDelete(index)}
                />
            </OmegaTd>
        </Table.Tr>
    ));

    return (
        <Flex h='100%' direction='column' gap={rem(8)}>
            <ModularBox>
                <Grid>
                    <Grid.Col span={match ? 11 : 8}  >
                        <SearchInputText
                            placeholder="Buscar"
                            value={tableHook.search}
                            onChange={tableHook.onSearch}
                        />
                    </Grid.Col>
                    <Grid.Col span={match ? 1 : 4}>
                        <Flex direction='row' justify='flex-end' align='center' h='100%'>
                            {
                                match ?
                                    <Tooltip
                                        label={'Crear Usuario'}
                                        withArrow>
                                        <ActionIcon size='sm' onClick={events.onCreate} variant='transparent'>
                                            <IconCirclePlus style={{ width: rem(24), height: rem(24) }} />
                                        </ActionIcon>
                                    </Tooltip> :
                                    <Button
                                        leftSection={
                                            <IconPlus style={{ width: rem(12), height: rem(12) }} />
                                        }
                                        onClick={events.onCreate}
                                        radius='xl'
                                        size='xs'>
                                        Nuevo usuario
                                    </Button>

                            }
                        </Flex>
                    </Grid.Col>
                </Grid>
            </ModularBox>

            <ModularBox h='100%'>
                <Header text={'Usuarios'} />

                <OmegaTable
                    loading={load}
                    header={header}
                    rows={rows}
                    total={tableHook.total}
                    page={tableHook.page}
                    onPageChange={tableHook.setPage} />
            </ModularBox>
        </Flex>
    );
}

export default UserLayout