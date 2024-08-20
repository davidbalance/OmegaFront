import { ExtendedActionProps } from "@/components/_base/ActionMenu";
import { Menu, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconVirus, IconStethoscope } from "@tabler/icons-react";
import { useCallback } from "react";
import { MedicalResultModalDiseases } from "../../modal/MedicalResultModalDiseases";
import { MedicalResultExamSelectionFormUpdateModal } from "../../modal/MedicalResultExamSelectionFormUpdateModal";
import { MedicalResult } from "@/lib/dtos/medical/result/base.response.dto";

export type MedicalResultManagementMenuProps<T> = ExtendedActionProps<T> & {
    result: MedicalResult;
    onDiseaseModification?: (value: MedicalResult) => void;
    onExamType?: (value: MedicalResult) => void;
}

const withMedicalResultManagement = <T extends object>(
    WrappedComponent: React.ComponentType<ExtendedActionProps<T> & { result?: MedicalResult }>
): React.FC<MedicalResultManagementMenuProps<T>> => {

    const hoc: React.FC<MedicalResultManagementMenuProps<T>> = ({
        result: data,
        loading,
        children,
        onDiseaseModification,
        onExamType,
        ...props }
    ) => {

        const [openedDiseaseModal, {
            open: OpenDiseaseModal,
            close: CloseDiseaseModal
        }] = useDisclosure(false);

        const [openedExamModal, {
            open: OpenExamModal,
            close: CloseExamModal
        }] = useDisclosure(false);

        const handleEventDiseaseFormSubmit = useCallback((newValue: MedicalResult) => {
            onDiseaseModification?.(newValue);
            OpenDiseaseModal();
        }, [onDiseaseModification, OpenDiseaseModal]);

        const handleEventDisease = useCallback(() => {
            OpenDiseaseModal();
        }, [OpenDiseaseModal]);

        const handleEventExam = useCallback(() => {
            OpenExamModal();
        }, [OpenExamModal]);

        const handleEventExamTypeFormSubmit = useCallback((newValue: MedicalResult) => {
            onExamType?.(newValue)
            CloseExamModal();
        }, [onExamType, CloseExamModal]);

        return (
            <>
                <MedicalResultModalDiseases
                    medicalResult={data}
                    opened={openedDiseaseModal}
                    onClose={CloseDiseaseModal}
                    onFormSubmitted={handleEventDiseaseFormSubmit} />
                <MedicalResultExamSelectionFormUpdateModal
                    medicalResult={data}
                    onFormSubmitted={handleEventExamTypeFormSubmit}
                    opened={openedExamModal}
                    onClose={CloseExamModal} />
                <WrappedComponent
                    result={data}
                    loading={loading}
                    {...props as ExtendedActionProps<T>}>
                    {(onDiseaseModification || onExamType) && <Menu.Label>Misc.</Menu.Label>}
                    {onDiseaseModification && (
                        <Menu.Item
                            onClick={handleEventDisease}
                            leftSection={(
                                <IconVirus style={{ width: rem(16), height: rem(16) }} />
                            )}>
                            Modificar morbilidades
                        </Menu.Item>
                    )}
                    {onExamType && (
                        <Menu.Item
                            onClick={handleEventExam}
                            leftSection={(
                                <IconStethoscope style={{ width: rem(16), height: rem(16) }} />
                            )}>
                            Modificar tipo de examen
                        </Menu.Item>
                    )}
                    {children}
                </WrappedComponent>
            </>
        );
    }

    hoc.displayName = `withMedicalResultManagement(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return hoc;
}

export { withMedicalResultManagement }; 