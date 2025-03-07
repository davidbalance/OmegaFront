import ListTbody from '@/components/_base/list/list-tbody'
import React from 'react'
import { Area } from '@/server/area/server_types'
import AreaItem from './area_item'

interface AreaListProps {
    areas: Area[]
}
const AreaList: React.FC<AreaListProps> = ({ areas }) => {
    return (
        <ListTbody>
            {areas.map(e => <AreaItem
                key={e.areaId}
                {...e} />)}
        </ListTbody>
    )
}

export default AreaList