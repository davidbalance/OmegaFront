import { ListRowProps } from "@/components/layout/list-layout/components/row/ListRow";
import { MedicalResult } from "@/lib/dtos/medical/result/base.response.dto";
import { MedicalResultActionMenu, MedicalResultActionMenuProps } from "../action/MedicalResultActionMenu";

type ListRowPropOmittedProps = Omit<ListRowProps, 'rightSection'>

export interface MedicalResultListRowProps extends ListRowPropOmittedProps {
    data: MedicalResult;
    actions?: Omit<MedicalResultActionMenuProps, | 'data'>;
}

const rowWithMedicalResult = (
    WrappedComponent: React.ComponentType<ListRowProps>
): React.FC<MedicalResultListRowProps> => {

    const HOCListRow: React.FC<MedicalResultListRowProps> = ({ data, actions, ...props }) => {
        return <WrappedComponent
            rightSection={actions ? (
                <MedicalResultActionMenu data={data} {...actions} />
            ) : undefined}
            {...props} />
    }

    return HOCListRow;
}

export { rowWithMedicalResult }