import OmegaComboBox from '@/components/combobox/OmegaComboBox';
import { SelectorOption } from '@/lib';
import { Box, Button, Drawer, DrawerProps, Grid, Tabs, TabsPanelProps, Text, Title, rem } from '@mantine/core'
import dayjs from 'dayjs';
import React from 'react'
import PatientResultForm, { ResultData } from '../patient-result-form/PatientResultForm';

type CustomTabPanelProps = TabsPanelProps;
const CustomTabPanel: React.FC<CustomTabPanelProps> = ({ ...props }) => (
    <Tabs.Panel p={rem(16)} {...props} />
);


type PatientResultDrawerProps = Omit<DrawerProps, 'size' | 'position'> & {
    patientResults: ResultData[];
    diseaseOptions: SelectorOption<number>[]
}
const PatientResultDrawer: React.FC<PatientResultDrawerProps> = ({ patientResults, diseaseOptions, ...props }) => {

    return (
        <Drawer
            position='right'
            size='md'
            keepMounted={false}
            {...props}>

            <Tabs keepMounted={false} defaultValue="0">
                <Tabs.List grow>
                    {
                        patientResults.map((result, index) => (
                            <Tabs.Tab value={`${index}`} key={dayjs().toISOString()}>
                                <Text size='sm' component="span" variant="text" >{result.examName}</Text>
                            </Tabs.Tab>)
                        )

                    }
                </Tabs.List>

                {
                    patientResults.map((result, index) => (
                        <CustomTabPanel value={`${index}`} key={dayjs().toISOString()}>
                            <PatientResultForm
                                result={result}
                                options={diseaseOptions}
                                onSubmit={() => props.onClose()} />
                        </CustomTabPanel>)
                    )
                }
            </Tabs>

        </Drawer>
    )
}

export default PatientResultDrawer