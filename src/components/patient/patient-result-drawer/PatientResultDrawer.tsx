import OmegaComboBox from '@/components/combobox/OmegaComboBox';
import { MorbidityModel } from '@/services';
import { Box, Button, Drawer, DrawerProps, Grid, Tabs, TabsPanelProps, Text, Title, rem } from '@mantine/core'
import dayjs from 'dayjs';
import React from 'react'

type CustomTabPanelProps = TabsPanelProps;
const CustomTabPanel: React.FC<CustomTabPanelProps> = ({ ...props }) => (
    <Tabs.Panel p={rem(16)} {...props} />
);

const PatientResultForm: React.FC<{ result: ResultData, options: MorbidityModel[], onSubmit?: (data: any) => void }> = ({ result, options, onSubmit }) => {

    return <Box component='form' onSubmit={(e) => { e.preventDefault(); onSubmit?.(null); }}>
        <Grid h='70vh' p={rem(16)} pos='relative'>
            <Grid.Col span={12}>
                <Title fw={500} size='sm' component="span" variant="text" c='omegaColors'>
                    {result.examName}
                </Title>
            </Grid.Col>
            <Grid.Col span={12}>
                <OmegaComboBox options={options.map((m) => m.name)} />
            </Grid.Col>
            <Button type='submit' fullWidth pos='absolute' bottom={0}>Guardar</Button>
        </Grid>
    </Box>
}

type ResultData = {
    examName: string;
}
type PatientResultDrawerProps = Omit<DrawerProps, 'size' | 'position'> & {
    patientResults: ResultData[];
    morbidities: MorbidityModel[]
}
const PatientResultDrawer: React.FC<PatientResultDrawerProps> = ({ patientResults, morbidities, ...props }) => {

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
                            <PatientResultForm result={result} options={morbidities} onSubmit={() => props.onClose()} />
                        </CustomTabPanel>)
                    )
                }
            </Tabs>

        </Drawer>
    )
}

export default PatientResultDrawer