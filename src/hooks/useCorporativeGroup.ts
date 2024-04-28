import { CorporativeGroupService } from "@/services/api";
import { FindCorporativeGroupSelectorOptions } from "@/services/api/corporative-group/dtos";
import endpoints from "@/services/endpoints/endpoints";

export const useCorporativeGroup = () => {
    const corporativeGroupService = new CorporativeGroupService(endpoints.CORPORATIVE_GROUP.V1);

    const find = async (id: FindCorporativeGroupSelectorOptions) => {
        try {
            const user = await corporativeGroupService.findSelectorOptions(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    return {
        find
    }

}