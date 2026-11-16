'use client'

import React from 'react'
import { useMassiveUpload } from '../_context/massive-upload.context'
import ListRoot from '@/components/_base/list/list-root'
import ListTbody from '@/components/_base/list/list-tbody'
import TestItem from './test-item'

const FileList = () => {

    const { files } = useMassiveUpload()

    return (
        <ListRoot>
            <ListTbody>
                {files.map(e => {
                    const rowKey = e.status === "error" ? e.name : e.id
                    return <TestItem
                        key={rowKey}
                        item={e} />
                })}
            </ListTbody>
        </ListRoot>
    )
}

export default FileList