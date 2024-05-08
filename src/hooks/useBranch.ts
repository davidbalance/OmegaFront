import { SelectorOption } from "@/lib";
import { BranchService } from "@/services/api";
import { Branch } from "@/services/api/branch/dtos";
import { FindBranchSelectorOptions } from "@/services/api/branch/dtos";
import endpoints from "@/services/endpoints/endpoints";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export const useBranch = () => {
    const branchService = new BranchService(endpoints.BRANCH.V1);

    const [loading, Disclosure] = useDisclosure();
    const [index, setIndex] = useState<number | undefined>(undefined);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [options, setOptions] = useState<SelectorOption<number>[]>([]);

    const find = async (company: string) => {
        Disclosure.open();
        try {
            const branches = await branchService.find(company);
            console.log(branches)
            setBranches(branches);
            Disclosure.close();
            return branches;
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
            const options = await branchService.findSelectorOptions();
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
    const findSelector = async (id: FindBranchSelectorOptions) => {
        try {
            const user = await branchService.findSelectorOptions(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    return {
        loading,
        branches,
        branch: index !==undefined ? branches[index] : undefined,
        options,
        find,
        loadOptions,
        selectItem,
        clearSelected
    }
}