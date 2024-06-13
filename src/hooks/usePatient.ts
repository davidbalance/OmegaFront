import { PatientService } from "@/services/api";
import { Patient } from "@/services/api/patient/dtos";
import endpoints from "@/lib/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

export const usePatient = (loadOnStart: boolean = false) => {
    const patientService = new PatientService(endpoints.PATIENT.V1);

    const [loading, Disclosure] = useDisclosure();

    const [patients, setPatients] = useState<Patient[]>([]);

    useEffect(() => {
        if (loadOnStart) {
            find();
        }
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const find = async () => {
        try {
            const patients = await patientService.find();
            setPatients(patients);
            Disclosure.close();
            return patients;
        } catch (error) {
            notifications.show({
                title: 'Error al obtener los usuarios',
                message: 'Se produjo un error al actualizar la contraseña 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    };

    return {
        loading,
        patients,
        find
    }

}