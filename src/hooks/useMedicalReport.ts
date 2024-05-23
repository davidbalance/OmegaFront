import { MedicalReportService, MedicalResultService } from "@/services/api";
import { FindMedicalReportPDFRQ } from "@/services/api/medical-report/dtos";
import { InsertMedicalReportRQ } from "@/services/api/medical-result/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

export const useMedicalReport = () => {
    const medicalReportService = new MedicalReportService(endpoints.MEDICAL_REPORT.V1);

    const [loading, Disclosure] = useDisclosure();

    const findMedicalReport = async ({ id, ...params }: FindMedicalReportPDFRQ) => {
        Disclosure.open();
        try {
            await medicalReportService.findFile({ id, ...params });
            Disclosure.close();
        } catch (error) {
            notifications.show({
                title: 'Error al obtener reportes médicos',
                message: 'Ha ocurrido un error al obtener los resportes médicos 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    return {
        loading,
        findMedicalReport
    }
}