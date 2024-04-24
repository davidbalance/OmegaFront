'use client'

// import OmegaTable from '@/components/table/omega-table/OmegaTable'
// import AssignCredentialDrawer from '@/components/user/assign-credential-drawer/AssignCredentialDrawer'
// import { DoctorService, IFindService } from '@/services'
import { Doctor as DoctorType } from '@/services/api/doctor/dtos'
import { User as UserType } from '@/services/api/user/dtos'
// import { Group, Title, Text, Table, TextInput, rem } from '@mantine/core'
// import { IconSearch } from '@tabler/icons-react'
import React, {  } from 'react'

// const doctorService: IFindService<any, DoctorType> = new DoctorService(endpoints.DOCTOR.V1)
type DoctorData = Omit<DoctorType, 'user'> & Omit<UserType, 'id'> & { user: number };

const parseDoctor = (data: DoctorType): DoctorData => ({ ...data, ...data.user, user: data.user.id });

const Doctor: React.FC = () => {

    /* const [selected, setSelected] = useState<DoctorData | undefined>(undefined);

    const table = useTable<DoctorData>([], 50);

    const [tableLoading, TableDisclosure] = useDisclosure(true);
    const [openAssignCredentialForm, AssignCredentialDisclosure] = useDisclosure(false);

    useLayoutEffect(() => {
        load();
        return () => { }
    }, []);

    const load = async () => {
        try {
            TableDisclosure.open()
            const doctors = await doctorService.find();
            const doctorData = doctors.reduce((prev: DoctorData[], curr) => [...prev, parseDoctor(curr)], []);
            table.setData(doctorData);
        } catch (error) {
            console.error(error);
            notifications.show({
                title: 'Error',
                message: 'Se ha producido un error al cargar medicos',
                color: 'red'
            });
        } finally {
            TableDisclosure.close();
        }
    }

    const rows = table.rows.map((row) =>
        <Table.Tr key={row.id}>
            <Table.Td>{row.dni}</Table.Td>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>{row.lastname}</Table.Td>
            <Table.Td>{row.email}</Table.Td>
            <Table.Td>
                <DoctorSettingsMenu
                    onAssignCredential={() => { setSelected(row); AssignCredentialDisclosure.open() }} />
            </Table.Td>
        </Table.Tr>
    );

    const header = <>
        <SortTh
            sorted={table.sortBy === 'dni'}
            reversed={table.sortDirection}
            onSort={() => table.setSorting('dni')}>
            CI
        </SortTh>
        <SortTh
            sorted={table.sortBy === 'email'}
            reversed={table.sortDirection}
            onSort={() => table.setSorting('email')}>
            Correo Electronico
        </SortTh>
        <SortTh
            sorted={table.sortBy === 'name'}
            reversed={table.sortDirection}
            onSort={() => table.setSorting('name')}>
            Nombre
        </SortTh>
        <SortTh
            sorted={table.sortBy === 'lastname'}
            reversed={table.sortDirection}
            onSort={() => table.setSorting('lastname')}>
            Apellido
        </SortTh>
        <Table.Th>Acciones</Table.Th>
    </> */

    return (
        <>
            {/* <AssignCredentialDrawer
                opened={openAssignCredentialForm}
                onClose={AssignCredentialDisclosure.close}
                email={selected?.email || ''}
                user={selected?.user || 0} />

            <Group justify="space-between">
                <Text fw={500} fz="sm">
                    <Title component="span" variant="text" c='omegaColors'>
                        Medicos
                    </Title>
                </Text>
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
                header={header}
                loading={tableLoading}
                rows={rows}
                total={table.total}
                page={table.page}
                onPageChange={table.setPage} /> */}
        </>
    )
}

export default Doctor