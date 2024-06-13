'use client'

import React, { useEffect, useState } from "react"
import { BranchLayout } from "@/components/branch/branch-layout/BranchLayout"
import { useBranch } from "@/hooks"
import { BranchService } from "@/services/api"
import { Branch as BranchType } from "@/services/api/branch/dtos";
import endpoints from "@/lib/endpoints/endpoints";
import { SelectorOption } from "@/lib";

const branchService = new BranchService(endpoints.BRANCH.V1);

enum LayoutStates {
    DEFAULT
}

type BranchProps = { params: { id: string } };


const Branch: React.FC<BranchProps> = ({params}) => {

    const branchHook = useBranch();

    const [branches, setBranches] = useState<BranchType[] | undefined>([]);
    const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);
    const [options, setOptions] = useState<SelectorOption<number>[]>([]);

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const load = async () => {
        try {
            const branches = await branchService.find( params.id );
            setBranches(branches);
            setOptions(options);
        } catch (error) {
        } 
    }

    const handleClose = (group: string) => {
        branchHook.clearSelected();
        branchHook.find(group);
        setCurrentState(LayoutStates.DEFAULT);
    }

    const view: Record<LayoutStates, React.ReactNode> = {
        [LayoutStates.DEFAULT]:
                <BranchLayout
                    load={branchHook.loading}
                    branches={branches!}
                />
    }

    return <>
        {
            view[currentState]
        }
    </>

}

export default Branch