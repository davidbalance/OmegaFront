import { DoctorService } from "@/services/api";
import { Doctor, FindOneAndUploadSignature } from "@/services/api/doctor/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

export const useDoctor = (loadOnStart: boolean = false) => {

    const doctorService = new DoctorService(endpoints.DOCTOR.V1);

    const [loading, LoadDisclosure] = useDisclosure(false);

    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [index, setIndex] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (loadOnStart) {
            find();
        }
        return () => { }
    }, []);


    const find = async () => {
        LoadDisclosure.open();
        try {
            const foundDoctors = await doctorService.find();
            setDoctors(foundDoctors);
            LoadDisclosure.close();
            return foundDoctors;
        } catch (error) {
            notifications.show({
                title: 'Error al obtener medicos',
                message: 'Se produjo un error al obtener medicos del servidor 😔',
                color: 'red'
            });
            console.error(error);
            LoadDisclosure.close();
            throw error;
        }
    }

    const uploadSignature = async ({ id, ...props }: FindOneAndUploadSignature) => {
        LoadDisclosure.open();
        try {
            await doctorService.findOneAndUploadFile({ id, ...props });
            LoadDisclosure.close();
        } catch (error) {
            notifications.show({
                title: 'Error al obtener medicos',
                message: 'Se produjo un error al obtener medicos del servidor 😔',
                color: 'red'
            });
            console.error(error);
            LoadDisclosure.close();
            throw error;
        }
    }

    const selectItem = (index: number) => setIndex(index);
    const clearSelection = () => setIndex(undefined);

    return {
        loading,
        doctors,
        doctor: index !== undefined ? doctors[index] : undefined,
        find,
        uploadSignature,
        selectItem,
        clearSelection
    }
}