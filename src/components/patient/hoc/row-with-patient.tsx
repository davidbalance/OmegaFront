import { ListRowProps } from '@/components/layout/list-layout/components/row/ListRow'
import { Patient } from '@/lib/dtos/user/patient/base.response.dto'
import React, { useMemo } from 'react'
import { PatientActionButton } from '../action/PatientActionButton'

type ListRowPropOmittedProps = Omit<ListRowProps, 'rightSection'>

interface PatientAction {
    onCompany?: (row: Patient) => void;
    onEmail?: (row: Patient) => void;
    onManagementArea?: (row: Patient) => void;
    onJobPosition?: (row: Patient) => void;
}

export interface PatientListRowProps extends ListRowPropOmittedProps {
    data: Patient;
    actions?: PatientAction
}

const rowWithPatient = <T extends object>(
    WrappedComponent: React.ComponentType<ListRowProps>
): React.FC<PatientListRowProps> => {

    const HOCListRow: React.FC<PatientListRowProps> = ({ data, actions, ...props }) => {

        const processedActions: { [x: string]: () => void; } | undefined = useMemo(() => actions
            ? Object.entries(actions)
                .map(([key, value]: [string, (row: Patient) => void]) => ({ [key]: () => value(data) }))
                .reduce((prev, curr) => ({ ...prev, ...curr }), {})
            : undefined, [actions]);

        return <WrappedComponent
            rightSection={processedActions ? (
                <PatientActionButton {...processedActions} />
            ) : undefined}
            {...props} />
    }

    return HOCListRow;
}

export { rowWithPatient }