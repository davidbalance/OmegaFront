import { SelectorOption } from "@/lib";
import { CompanyService } from "@/services/api";
import { Company } from "@/services/api/company/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export const useCompany = () => {
    const companyService = new CompanyService(endpoints.COMPANY.V1);

    const [loading, Disclosure] = useDisclosure();
    const [index, setIndex] = useState<number | undefined>(undefined);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [options, setOptions] = useState<SelectorOption<number>[]>([]);


    const find = async (group: string) => {
        Disclosure.open();
        try {
            const companies = await companyService.find(group);
            console.log(companies)
            setCompanies(companies);
            Disclosure.close();
            return companies;
        } catch (error) {
            notifications.show({
                title: 'Error al obtener los datos',
                message: 'Se produjo un error al obtener los datos 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    const loadOptions = async () => {
        Disclosure.open();
        try {
            const options = await companyService.findSelectorOptions();
            setOptions(options);
            Disclosure.close();
        } catch (error) {
            notifications.show({
                title: 'Error al obtener los datos',
                message: 'Se produjo un error al obtener los datos 😔',
                color: 'red'
            });
            console.error(error);
            Disclosure.close();
            throw error;
        }
    }

    const selectItem = (index: number) => setIndex(index);
    const clearSelected = () => setIndex(undefined);

    return {
        loading,
        companies,
        company: index !==undefined ? companies[index] : undefined,
        options,
        find,
        loadOptions,
        selectItem,
        clearSelected
    }

}