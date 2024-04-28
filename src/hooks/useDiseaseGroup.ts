import { DiseaseGroupService } from "@/services/api";
import { CreateDiseaseGroupRQ, DeleteDiseaseGroupRQ, FindDiseaseGroupRS, UpdateDiseaseGroupRQ } from "@/services/api/disease-group/dtos";
import endpoints from "@/services/endpoints/endpoints";

export const useDiseaseGroup = () => {
    const diseaseGroupService = new DiseaseGroupService(endpoints.DISEASE_GROUP.V1);

    const create = async (diseaseDTO: CreateDiseaseGroupRQ) => {
        try {
            const user = await diseaseGroupService.create(diseaseDTO);
            return user;
        } catch (error) {
            throw error;
        }
    }

    const find = async (id: FindDiseaseGroupRS) => {
        try {
            const user = await diseaseGroupService.find();
            return user;
        } catch (error) {
            throw error;
        }
    }

    const erase = async (id: DeleteDiseaseGroupRQ) => {
        try {
            const user = await diseaseGroupService.findOneAndDelete(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    const update = async (diseaseDTO: UpdateDiseaseGroupRQ) => {
        try {
            const user = await diseaseGroupService.findOneAndUpdate(diseaseDTO);
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