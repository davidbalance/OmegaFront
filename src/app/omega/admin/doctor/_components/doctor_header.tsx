import OrderableButton from '@/components/_base/orderable-button/orderable-button'
import TableTh from '@/components/_base/table/table-th'
import TableTHead from '@/components/_base/table/table-thead'
import { TableTr, Text } from '@mantine/core'
import React from 'react'

const DoctorHeader: React.FC = () => {
    return (
        <TableTHead>
            <TableTr>
                <TableTh>
                    <OrderableButton field='userDni'>
                        <Text>Cedula</Text>
                    </OrderableButton>
                </TableTh>
                <TableTh>
                    <OrderableButton field='userName'>
                        <Text>Nombre</Text>
                    </OrderableButton>
                </TableTh>
                <TableTh>
                    <OrderableButton field='userLastname'>
                        <Text>Apellido</Text>
                    </OrderableButton>
                </TableTh>
                <TableTh>
                    <OrderableButton field='userEmail'>
                        <Text>Correo Electronico</Text>
                    </OrderableButton>
                </TableTh>
                <TableTh>
                    <Text>Accion</Text>
                </TableTh>
            </TableTr>
        </TableTHead>
    )
}

export default DoctorHeader