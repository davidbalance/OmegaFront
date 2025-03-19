import ReturnableHeader from "@/components/_base/returnable-header"
import { ModularBox } from "@/components/modular/box/ModularBox"
import { Stack } from "@mantine/core"
import PatientMassiveLoadForm from "./_components/patient-massive-load-form"

const PatientMassiveLoadPage: React.FC = () => {
    return (
        <>
            <ReturnableHeader title='Carga de masiva de pacientes' />
            <ModularBox flex={1}>
                <Stack h='100%' align='center' justify='center'>
                    <PatientMassiveLoadForm />
                </Stack>
            </ModularBox >
        </>
    )
}

export default PatientMassiveLoadPage