import ListTbody from '@/components/_base/list/list-tbody'
import { Corporative } from '@/server/corporative/server_types'
import React from 'react'
import CorporativeItem from './corporative_item'

interface CorporativeListProps {
    active?: string;
    groups: Corporative[];
    removeQueries?: string[];
}
const CorporativeList: React.FC<CorporativeListProps> = ({
    active,
    groups,
    removeQueries
}) => {
    return (
        <ListTbody>
            {groups.map(e => <CorporativeItem
                key={e.corporativeId}
                active={active === e.corporativeId}
                removeQueries={removeQueries}
                {...e} />)}
        </ListTbody>
    )
}

export default CorporativeList