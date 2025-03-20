import ReturnableHeader from "@/components/_base/returnable-header"
import { ModularBox } from "@/components/modular/box/ModularBox"
import { Box, Stack } from "@mantine/core"
import PatientMassiveLoadForm from "./_components/patient-massive-load-form"
import MassiveLoadTemplateButton from "@/components/_base/massive-load-template-button"

const PatientMassiveLoadPage: React.FC = () => {
    return (
        <>
            <ReturnableHeader title='Carga de masiva de pacientes' />
            <ModularBox flex={1}>
                <Stack
                    h='100%'
                    align='center'
                    justify='center'
                    pos='relative'>
                    <Box
                        component="div"
                        pos='absolute'
                        top={0}
                        right={0}>
                        <MassiveLoadTemplateButton type="patient" />
                    </Box>
                    <PatientMassiveLoadForm />
                </Stack>
            </ModularBox >
        </>
    )
}

export default PatientMassiveLoadPage