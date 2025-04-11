import ListTbody from '@/components/_base/list/list-tbody'
import React from 'react'
import { MedicalOrder } from '@/server/medical-order/server-types'
import OrderItem from './order_item'

interface OrderListProps {
    active?: string;
    action?: boolean;
    checklist?: boolean;
    remove?: boolean;
    patientDni?: string;
    orders: MedicalOrder[];
    removeQueries?: string[];
}
const OrderList: React.FC<OrderListProps> = ({
    patientDni,
    active,
    orders,
    ...props
}) => {
    return (
        <ListTbody>
            {orders.map(e => patientDni && <OrderItem
                active={active === e.orderId}
                key={e.orderId}
                patientDni={patientDni}
                {...e}
                {...props} />)}
        </ListTbody>
    )
}

export default OrderList