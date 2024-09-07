import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import AreaForm from './_components/form'

interface OmegaManagementAreaPageProps {
    params: { id: number }
}
const OmegaManagementAreaPage: React.FC<OmegaManagementAreaPageProps> = ({
    params
}) => {
    return (
        <>
            <ReturnableHeader title='Creacion de area' />
            <AreaForm management={params.id} />
        </>)
}

export default OmegaManagementAreaPage