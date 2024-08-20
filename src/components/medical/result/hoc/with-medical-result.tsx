import { ListRowProps } from "@/components/layout/list-layout/components/row/ListRow";
import { MedicalResult } from "@/lib/dtos/medical/result/base.response.dto";
import { MedicalResultActionMenu, MedicalResultActionMenuProps } from "../action/MedicalResultActionMenu";

type ListRowPropOmittedProps = Omit<ListRowProps, 'rightSection'>

export interface MedicalResultListRowProps extends ListRowPropOmittedProps {
    data: MedicalResult;
    actions?: Omit<MedicalResultActionMenuProps, | 'data'>;
    menu?: React.ReactNode;
}

const withMedicalResult = (
    WrappedComponent: React.ComponentType<ListRowProps>
): React.FC<MedicalResultListRowProps> => {

    const hoc: React.FC<MedicalResultListRowProps> = ({ data, menu, actions, ...props }) => {
        return <WrappedComponent
            rightSection={menu
                ? menu
                : actions ? (
                    <MedicalResultActionMenu data={data} {...actions} />
                ) : undefined}
            {...props} />
    }

    hoc.displayName = `withMedicalResult(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return hoc;
}

export { withMedicalResult }