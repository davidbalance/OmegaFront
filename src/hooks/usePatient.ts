import { PatientService } from "@/services/api";
import { FindPatientRS } from "@/services/api/patient/dtos";
import endpoints from "@/services/endpoints/endpoints";

export const usePatient = () => {
    const patientService = new PatientService(endpoints.PATIENT.V1);

    const find = async (dni: FindPatientRS) => {
        try {
            const user = await patientService.find(dni);
            return user;
        } catch (error) {
            throw error;
        }
    };

    return {
        find
    }

}