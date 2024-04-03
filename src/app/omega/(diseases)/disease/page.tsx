'use client'

import CreateDiseaseDrawer from '@/components/morbidity/create-disease-drawer/CreateDiseaseDrawer';
import DeleteDiseaseDialog from '@/components/morbidity/delete-disease-dialog/DeleteDiseaseDialog';
import UpdateDiseaseDrawer from '@/components/morbidity/update-disease-drawer/UpdateDiseaseDrawer';
import OmegaTable from '@/components/table/omega-table/OmegaTable';
import SortTh from '@/components/table/sort-th/SortTh';
import UserSettingsMenu from '@/components/user/user-settings-menu/UserSettingsMenu';
import { useTable } from '@/hooks/useTable';
import { SelectorOption } from '@/lib';
import {
    DiseaseGroupService,
    DiseaseService,
    Disease as DiseaseType,
    IFindService,
    ISelectorService
} from '@/services';
import endpoints from '@/services/endpoints/endpoints';
import {
    Group,
    Title,
    Center,
    ActionIcon,
    rem,
    Table,
    TextInput
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
    IconCirclePlus,
    IconSearch
} from '@tabler/icons-react'
import React,
{
    useLayoutEffect,
    useState
} from 'react'

const diseaseService: IFindService<any, DiseaseType> = new DiseaseService(endpoints.DISEASE.V1);
const diseaseGroupService: ISelectorService<any, number> = new DiseaseGroupService(endpoints.DISEASE_GROUP.V1);

type DiseaseData = DiseaseType;
const Disease: React.FC = () => {

    const [selected, setSelected] = useState<DiseaseData | undefined>(undefined);
    const [groups, setGroups] = useState<SelectorOption<number>[]>([]);

    const table = useTable<DiseaseData>([], 50);

    const tableLoader = useDisclosure(true);
    const [openCreateFormDisclosure, CreateFormDisclosure] = useDisclosure(false);
    const [openModifyFormDisclosure, ModifyFormDisclosure] = useDisclosure(false);
    const [openDeleteFormDisclosure, DeleteFormDisclosure] = useDisclosure(false);

    useLayoutEffect(() => {
        load();
        return () => { }
    }, [])

    const load = async () => {
        try {
            tableLoader[1].open();
            const diseases = await diseaseService.find();
            const groups = await diseaseGroupService.findSelectorOptions();
            table.setData(diseases);
            setGroups(groups);
        } catch (error) {
            console.error(error);
            notifications.show(
                {
                    title: 'Error',
                    message: 'Se ha producido un error al cargar las morbilidades',
                    color: 'red'
                }
            );
        } finally {
            tableLoader[1].close();
        }
    }

    const header = <>
        <SortTh
            sorted={table.sortBy === 'name'}
            reversed={table.sortDirection}
            onSort={() => table.setSorting('name')} >
            Morbilidades
        </SortTh>
        <Table.Th>Acciones</Table.Th>
    </>

    const rows = table.rows.map((row) => (
        <Table.Tr key={row.id}>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>
                <UserSettingsMenu
                    onModification={() => {
                        setSelected(row);
                        ModifyFormDisclosure.open();
                    }}
                    onDelete={() => {
                        setSelected(row);
                        DeleteFormDisclosure.open();
                    }}
                />
            </Table.Td>
        </Table.Tr>
    ));

    const handleCreateFormSubmittion = (data: DiseaseType) => {
        table.addRow(data);
    }

    const handleUpdateFormSubmittion = (data: DiseaseType) => {
        table.replaceRow('id', data.id, data);
    }

    const handleDeleteFormSubmittion = (id: number) => {
        table.removeRow('id', id);
    }

    return (
        <>
            <CreateDiseaseDrawer
                options={groups}
                opened={openCreateFormDisclosure}
                onClose={CreateFormDisclosure.close}
                onFormSubmitted={handleCreateFormSubmittion} />

            <UpdateDiseaseDrawer
                options={groups}
                opened={openModifyFormDisclosure}
                onClose={ModifyFormDisclosure.close}
                formData={selected || { group: { id: 0, name: 'placeholder' }, id: -1, name: 'placeholder' }}
                onFormSubmitted={handleUpdateFormSubmittion} />

            <DeleteDiseaseDialog
                opened={openDeleteFormDisclosure}
                onClose={DeleteFormDisclosure.close}
                onComplete={handleDeleteFormSubmittion}
                target={selected?.id || -1} />

            <Group justify="space-between">
                <Title component="span" variant="text" c='omegaColors'>
                    Morbilidades
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
                loading={tableLoader[0]}
                header={header}
                rows={rows}
                total={table.total}
                page={table.page}
                onPageChange={table.setPage} />
        </>
    )
}

export default Disease