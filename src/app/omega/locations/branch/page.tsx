'use client'

import React, { useState } from "react"
import { BranchLayout } from "@/components/branch/branch-layout/BranchLayout"
import { useBranch } from "@/hooks"

enum LayoutStates {
    DEFAULT
}

const Branch: React.FC = () => {

    const branchHook = useBranch();

    const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);

    const handleClose = (company: string) => {
        branchHook.clearSelected();
        branchHook.find(company);
        setCurrentState(LayoutStates.DEFAULT);
    }

    const view: Record<LayoutStates, React.ReactNode> = {
        [LayoutStates.DEFAULT]:
                <BranchLayout
                    load={branchHook.loading}
                    branches={branchHook.branches}
                />
    }

    return <>
        {
            view[currentState]
        }
    </>

}

export default Branch