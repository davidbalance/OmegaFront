import { BranchService } from "@/services/api";
import { FindBranchSelectorOptions } from "@/services/api/branch/dtos";
import endpoints from "@/services/endpoints/endpoints";

export const useBranch = () => {
    const branchService = new BranchService(endpoints.BRANCH.V1);

    const findSelector = async (id: FindBranchSelectorOptions) => {
        try {
            const user = await branchService.findSelectorOptions(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    return {
        findSelector
    }
}