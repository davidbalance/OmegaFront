import ReturnableHeader from '@/components/_base/returnable-header';
import React from 'react'
import CreateResourceForm from './_components/create-resource-form';

const DeveloperNavigationCreatePage: React.FC = () => {
    return (
        <>
            <ReturnableHeader title='Creacion de recursos' />
            <CreateResourceForm />
        </>
    );
}

export default DeveloperNavigationCreatePage