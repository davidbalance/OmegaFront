'use client'
import { ModularBox } from '@/components/modular-box/ModularBox'
import { useFetch } from '@/hooks/useFetch/useFetch'
import { Order } from '@/services/api/order/dtos'
import { Flex, Loader, Text, Title } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import React, { useEffect } from 'react'

const OrderIdPage: React.FC<{ params: { id: number } }> = ({ params }) => {
    const { data, error, loading } = useFetch<Order>(`/api/orders/${params.id}`, 'GET');

    useEffect(() => {
        if (error) {
            notifications.show({ message: error.message, color: 'red' });
        }
    }, [error])


    return (
        <>
            {
                loading
                    ? <Flex h='100%' justify='center' align='center' direction='column'>
                        <Loader type='dots' />
                        <Text>Buscando...</Text>
                    </Flex>
                    : data
                        ? JSON.stringify(data)
                        : <ModularBox h='100%' justify='center' align='center'>
                            <Title c='orange'>404</Title>
                            <Text>Ordenes no encontradas</Text>
                        </ModularBox >
            }
        </>
    )
}

export default OrderIdPage