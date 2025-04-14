import ReturnableHeader from '@/components/_base/returnable-header'
import React from 'react'
import CreateCorporativeForm from './_components/create-corporative-form'

const CorporativeCreatePage: React.FC = () => {
    return (
        <>
            <ReturnableHeader title='Creacion de grupo corporativo' />
            <CreateCorporativeForm />
        </>
    )
}

export default CorporativeCreatePage