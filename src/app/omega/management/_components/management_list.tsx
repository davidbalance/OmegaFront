import ListTbody from '@/components/_base/list/list-tbody'
import React from 'react'
import { Management } from '@/server/management/server-types'
import ManagementItem from './management_item'

interface ManagementListProps {
    managements: Management[];
}
const ManagementList: React.FC<ManagementListProps> = ({ managements }) => {
    return (
        <ListTbody>
            {managements.map(e => <ManagementItem
                key={e.managementId}
                {...e} />)}
        </ListTbody>
    )
}

export default ManagementList