'use client'

import React, { useState } from "react"
import { CorporativeGroupLayout } from "@/components/corporative-group/corporative-group-layout/CorporativeGroupLayout"
import { useCorporativeGroup } from "@/hooks"

enum LayoutStates {
    DEFAULT
}

const CorporativeGroup: React.FC = () => {

    const corporativeGroupHook = useCorporativeGroup(true);

    const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);

    const handleClose = () => {
        corporativeGroupHook.clearSelected();
        corporativeGroupHook.find();
        setCurrentState(LayoutStates.DEFAULT);
    }

    const view: Record<LayoutStates, React.ReactNode> = {
        [LayoutStates.DEFAULT]:
                <CorporativeGroupLayout
                    load={corporativeGroupHook.loading}
                    corporativeGroups={corporativeGroupHook.corporativeGroups}
                />
    }

    return <>
        {
            view[currentState]
        }
    </>

}

export default CorporativeGroup