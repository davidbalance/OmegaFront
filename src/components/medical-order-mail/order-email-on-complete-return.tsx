'use client'

import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import OrderEmailSelectForm from './order-email-select-form'

type OrderEmailOnCompleteReturnProps = Omit<React.ComponentPropsWithRef<typeof OrderEmailSelectForm>, 'onComplete'>
const OrderEmailOnCompleteReturn: React.FC<OrderEmailOnCompleteReturnProps> = ({ ...props }) => {

    const router = useRouter();

    const handleComplete = useCallback(() => router.back(), [router]);

    return (<OrderEmailSelectForm onComplete={handleComplete} {...props} />)
}

export default OrderEmailOnCompleteReturn