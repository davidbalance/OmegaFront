import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import ManagementForm from './_components/management-form'

const OmegaManagementPage: React.FC = () => {
    return (
        <>
            <ReturnableHeader title='Creacion de gerencias' />
            <ManagementForm />
        </>)
}

export default OmegaManagementPage