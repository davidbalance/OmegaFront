import { SelectorOption } from '@/lib';
import {
    Drawer,
    DrawerProps,
    LoadingOverlay,
    Tabs,
    TabsPanelProps,
    Text,
    rem
} from '@mantine/core'
import React from 'react'
import PatientResultForm from '../patient-result-form/PatientResultForm';
import { notifications } from '@mantine/notifications';
import endpoints from '@/services/endpoints/endpoints';
import { useDisclosure } from '@mantine/hooks';
import {
    IUpdateService,
    MedicalResultService,
} from '@/services';
import { UpdateMedicalResultRQ } from '@/services/api/medical-result/dtos';
import { Order as OrderType, OrderResult as OrderResultType } from '@/services/api/order/dtos';

const resultService: IUpdateService<UpdateMedicalResultRQ, void> = new MedicalResultService(endpoints.RESULT.V1);

type CustomTabPanelProps = TabsPanelProps;
const CustomTabPanel: React.FC<CustomTabPanelProps> = ({ ...props }) => (
    <Tabs.Panel p={rem(16)} {...props} />
);

type PatientResultDrawerProps = Omit<DrawerProps, 'size' | 'position'> & {
    arr: OrderResultType[];
    options: SelectorOption<number>[];
    onFormSubmit: (data: OrderResultType[]) => void;
}
const PatientResultDrawer: React.FC<PatientResultDrawerProps> = ({ onFormSubmit, arr, options, ...props }) => {

    const [visible, LoadDisclosure] = useDisclosure(false);

    const handleFormSubmitted = async ({ id, ...data }: OrderResultType) => {
        LoadDisclosure.open()
        try {
            await resultService.findOneAndUpdate({ id: id, disease: data.disease! });
            const index = arr.findIndex((e) => e.id === id);
            const patients = [...arr.slice(0, index), { id, ...data }, ...arr.slice(index)];
            onFormSubmit(patients);
            props.onClose();
        } catch (error) {
            console.error(error);
            notifications.show({
                message: 'Se produjo un error al actualizar el resultado'
            });
        } finally {
            LoadDisclosure.close()
        }
    }

    return (
        <Drawer
            position='right'
            size='xl'
            keepMounted={false}
            {...props}>

            <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <Tabs keepMounted={false} defaultValue="0">
                <Tabs.List grow>
                    {
                        arr.map((result, index) => (
                            <Tabs.Tab value={`${index}`} key={index}>
                                <Text size='sm' component="span" variant="text" >{result.examName}</Text>
                            </Tabs.Tab>)
                        )

                    }
                </Tabs.List>

                {
                    arr.map((result, index) => (
                        <CustomTabPanel value={`${index}`} key={index}>
                            <PatientResultForm
                                formData={result}
                                options={options}
                                onFormSubmitted={handleFormSubmitted} />
                        </CustomTabPanel>)
                    )
                }
            </Tabs>

        </Drawer>
    )
}

export default PatientResultDrawer