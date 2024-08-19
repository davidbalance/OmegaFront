import { ExtendedActionProps } from "@/components/_base/ActionMenu";
import { MedicalResult } from "@/lib/dtos/medical/result/base.response.dto";
import { MedicalReportFileMenuProps, menuWithMedicalReportFile } from "@/components/medical/report/hoc/menu-with-medical-report-file";
import { useMemo } from "react";
import { Menu, rem } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { MedicalReport } from "@/lib/dtos/medical/report/base.respoonse.dto";

export type MedicalResultReportMenuProps<T> = Omit<MedicalReportFileMenuProps<T>, 'data' | 'filename'> & {
    data: MedicalResult
};

const menuWithMedicalResultReport = <T extends object>(
    WrappedComponent: React.ComponentType<ExtendedActionProps<T> & { data?: MedicalResult | MedicalReport }>
): React.FC<MedicalResultReportMenuProps<T>> => {

    const EnhanceComponent = menuWithMedicalReportFile(WrappedComponent);

    const hoc: React.FC<MedicalResultReportMenuProps<T>> = ({ data, onCreateReportFile, ...props }
    ) => {
        console.log(data);
        const flag = useMemo(() => onCreateReportFile, [onCreateReportFile]);

        return (
            data.report
                ? <EnhanceComponent
                    data={data.report}
                    filename={data.examName}
                    onCreateReportFile={onCreateReportFile}
                    {...props as ExtendedActionProps<T>} />
                : <WrappedComponent
                    data={data}
                    {...props as ExtendedActionProps<T>}>
                    {(flag) && <Menu.Label>Reportes medicos</Menu.Label>}
                    {onCreateReportFile && (
                        <Menu.Item
                            onClick={onCreateReportFile}
                            leftSection={(
                                <IconPencil style={{ width: rem(14), height: rem(14) }} />
                            )}>
                            Elaborar reporte
                        </Menu.Item>
                    )}
                </WrappedComponent>
        )
    }

    return hoc;
}

export { menuWithMedicalResultReport }; 