import React from 'react'
import ListTbody from './list-tbody'
import ListRowSuspense from './list-row.suspense'

const ListBodySuspense = () => {
    return (
        <ListTbody>
            {[...Array(10)].map(() => <ListRowSuspense key={Math.random()} />)}
        </ListTbody>)
}

export default ListBodySuspense