import { CompanyService } from "@/services/api";
import { FindCompanySelectorOptions } from "@/services/api/company/dtos";
import endpoints from "@/services/endpoints/endpoints";

export const useCompany = () => {
    const companyService = new CompanyService(endpoints.COMPANY.V1);

    const find = async (id: FindCompanySelectorOptions) => {
        try {
            const user = await companyService.findSelectorOptions(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    return {
        find
    }

}