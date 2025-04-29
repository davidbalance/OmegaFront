import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import CreateAreaForm from './_components/create-area-form'

const AreaPage: React.FC = () => {
    return (
        <>
            <ReturnableHeader title='Creacion de areas' />
            <CreateAreaForm />
        </>)
}

export default AreaPage