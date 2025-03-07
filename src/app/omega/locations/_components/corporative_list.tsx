import ListTbody from '@/components/_base/list/list-tbody'
import { Corporative } from '@/server/corporative/server_types'
import React from 'react'
import CorporativeItem from './corporative_item'

interface CorporativeListProps {
    active?: string;
    groups: Corporative[]
}
const CorporativeList: React.FC<CorporativeListProps> = ({ active, groups }) => {
    return (
        <ListTbody>
            {groups.map(e => <CorporativeItem
                key={e.corporativeId}
                active={active === e.corporativeId}
                {...e} />)}
        </ListTbody>
    )
}

export default CorporativeList