'use client'

import { Checkbox } from '@mantine/core'
import React from 'react'
import { useCloudCheck } from './order-cloud-check.context'

const OrderCloudCheck: React.FC = () => {

    const { id, type, value, setValue } = useCloudCheck();

    return (
        <>
            <Checkbox
                checked={value}
                onChange={(e) => setValue(e.currentTarget.checked)} />
            {value ? <input type='hidden' name={id.toString()} value={type} /> : null}
        </>
    )
}

export default OrderCloudCheck