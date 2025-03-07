import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import ManagementForm from './_components/create_management_form'

const ManagementPage: React.FC = () => {
    return (
        <>
            <ReturnableHeader title='Creacion de gerencias' />
            <ManagementForm />
        </>)
}

export default ManagementPage