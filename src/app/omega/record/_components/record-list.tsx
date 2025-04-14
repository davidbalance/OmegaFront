import ListTbody from '@/components/_base/list/list-tbody'
import React from 'react'
import RecordItem from './record-item'
import { ClientRecord } from '@/server/record/server-types'

interface RecordListProps {
    records: ClientRecord[]
}
const RecordList: React.FC<RecordListProps> = ({
    records
}) => {
    return (
        <ListTbody>
            {records.map(e => <RecordItem key={e.recordId} {...e} />)}
        </ListTbody>
    )
}

export default RecordList