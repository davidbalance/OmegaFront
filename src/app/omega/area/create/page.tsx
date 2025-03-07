import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import CreateAreaForm from './_components/create_area_form'

const AreaPage: React.FC = () => {
    return (
        <>
            <ReturnableHeader title='Creacion de areas' />
            <CreateAreaForm />
        </>)
}

export default AreaPage