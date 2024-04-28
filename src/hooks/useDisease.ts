import { DiseaseService } from "@/services/api";
import { CreateDiseaseRQ, DeleteDiseaseRQ, FindDiseaseRS, UpdateDiseaseRQ } from "@/services/api/disease/dtos";
import endpoints from "@/services/endpoints/endpoints";

export const useDisease = () => {
    const diseaseService = new DiseaseService(endpoints.DISEASE.V1);

    const create = async (diseaseDTO: CreateDiseaseRQ) => {
        try {
            const user = await diseaseService.create(diseaseDTO);
            return user;
        } catch (error) {
            throw error;
        }
    }

    const find = async (id: FindDiseaseRS) => {
        try {
            const user = await diseaseService.find();
            return user;
        } catch (error) {
            throw error;
        }
    }

    const erase = async (id: DeleteDiseaseRQ) => {
        try {
            const user = await diseaseService.findOneAndDelete(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    const update = async (diseaseDTO: UpdateDiseaseRQ) => {
        try {
            const user = await diseaseService.findOneAndUpdate(diseaseDTO);
            return user;
        } catch (error) {
            throw error;
        }
    }

    return {
        create,
        find,
        erase,
        update
        
    }

}