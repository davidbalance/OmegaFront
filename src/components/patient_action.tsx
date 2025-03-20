import ActionMenuProvider from '@/contexts/action-menu.context'
import React from 'react'
import ActionMenu from './_base/action-menu'
import PatientMenuItems from './patient-menu-items'

type PatientActionProps = {
    patientDni: string
}
const PatientAction: React.FC<PatientActionProps> = ({
    patientDni
}) => {
    return (
        <ActionMenuProvider>
            <ActionMenu>
                <PatientMenuItems patientDni={patientDni} />
            </ActionMenu>
        </ActionMenuProvider>
    )
}

export default PatientAction