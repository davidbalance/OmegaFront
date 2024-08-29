import { ExtendedActionProps } from "@/components/_base/ActionMenu";
import { MedicalResult } from "@/lib/dtos/medical/result/base.response.dto";
import { useMemo } from "react";
import { Menu, rem } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { MedicalReportFileMenuProps, withMedicalReportFile } from "@/components/medical/report/hoc/with-medical-report-file";

export type MedicalResultReportMenuProps<T> = Omit<MedicalReportFileMenuProps<T>, 'report' | 'filename'> & {
    result: MedicalResult
};

const withMedicalResultReport = <T extends object>(
    WrappedComponent: React.ComponentType<ExtendedActionProps<T> & { result?: MedicalResult }>
): React.FC<MedicalResultReportMenuProps<T>> => {

    const EnhanceComponent = withMedicalReportFile(WrappedComponent);

    const hoc: React.FC<MedicalResultReportMenuProps<T>> = ({ result: data, onCreateReportFile, ...props }
    ) => {
        const shouldShowReportLabel = useMemo(() => onCreateReportFile, [onCreateReportFile]);

        return (
            !data.report
                ? <WrappedComponent
                    result={data}
                    {...props as ExtendedActionProps<T>}>
                    {(shouldShowReportLabel) && <Menu.Label>Reportes medicos</Menu.Label>}
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
                : <EnhanceComponent
                    result={data}
                    report={data.report}
                    filename={data.examName}
                    onCreateReportFile={onCreateReportFile}
                    {...props as ExtendedActionProps<T>} />
        );
    }

    hoc.displayName = `withMedicalResultReport(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return hoc;
}

export { withMedicalResultReport }; 