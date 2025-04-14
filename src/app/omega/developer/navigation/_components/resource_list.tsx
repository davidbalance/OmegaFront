import ListTbody from '@/components/_base/list/list-tbody'
import React from 'react'
import ResourceItem from './resource_item'
import { Resource } from '@/server/resource/server-types'

interface ResourceListProps {
    resources: Resource[]
}
const ResourceList: React.FC<ResourceListProps> = ({
    resources
}) => {
    return (
        <ListTbody height={400}>
            {resources.map(e => <ResourceItem key={e.resourceId} {...e} />)}
        </ListTbody>
    )
}

export default ResourceList