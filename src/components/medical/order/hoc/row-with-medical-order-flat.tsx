import { ListRowProps } from "@/components/layout/list-layout/components/row/ListRow";
import { MedicalOrder, MedicalOrderFlat } from "@/lib/dtos/medical/order/base.response.dto";
import { MedicalOrderListRowProps, rowWithMedicalOrder } from "./row-with-medical-order";
import { useMemo } from "react";

export interface MedicalOrderFlatListRowProps extends Omit<MedicalOrderListRowProps, 'data'> {
    data: MedicalOrderFlat;
}

const parseFlat = (data: MedicalOrderFlat): MedicalOrder => ({
    ...data,
    client: {
        ...data,
        name: "",
        lastname: ""
    }
})

const rowWithMedicalOrderFlat = (
    WrappedComponent: React.ComponentType<ListRowProps>
): React.FC<MedicalOrderFlatListRowProps> => {
    const EnhanceComponent: React.FC<MedicalOrderListRowProps> = rowWithMedicalOrder(WrappedComponent);

    const HOCListRow: React.FC<MedicalOrderFlatListRowProps> = ({ data, ...props }) => {
        const parsedData = useMemo(() => parseFlat(data), [data]);

        return <EnhanceComponent
            data={parsedData}
            {...props} />
    }

    return HOCListRow;
}

export { rowWithMedicalOrderFlat }