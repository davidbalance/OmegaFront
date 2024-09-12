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
                    <OrderableButton field='dni'>
                        <Text>Cedula</Text>
                    </OrderableButton>
                </TableTh>
                <TableTh>
                    <OrderableButton field='name'>
                        <Text>Nombre</Text>
                    </OrderableButton>
                </TableTh>
                <TableTh>
                    <OrderableButton field='lastname'>
                        <Text>Apellido</Text>
                    </OrderableButton>
                </TableTh>
                <TableTh>
                    <OrderableButton field='email'>
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