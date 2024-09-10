import { Flex, Loader } from '@mantine/core';
import React from 'react'

const BlobPreviewSuspense: React.FC = () => {

    return <Flex
        w='100%'
        h='100%'
        justify='center'
        align='center'>
        <Loader type="dots" />
    </Flex>
}

export default BlobPreviewSuspense