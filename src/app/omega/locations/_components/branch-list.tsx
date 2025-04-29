import ListTbody from '@/components/_base/list/list-tbody'
import React from 'react'
import BranchItem from './branch-item'
import { Branch } from '@/server/branch/server-types'

interface BranchListProps {
    branches: Branch[]
}
const BranchList: React.FC<BranchListProps> = ({ branches }) => {
    return (
        <ListTbody>
            {branches.map(e => <BranchItem key={e.branchId} {...e} />)}
        </ListTbody>
    )
}

export default BranchList