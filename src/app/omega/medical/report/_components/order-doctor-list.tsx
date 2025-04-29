import ListTbody from '@/components/_base/list/list-tbody';
import { MedicalOrderDoctor } from '@/server/medical-order/server-types';
import React from 'react'
import OrderDoctorItem from './order-doctor-item';

interface OrderDoctorListProps {
  active?: string;
  orders: MedicalOrderDoctor[];
  removeQueries?: string[];
}
const OrderDoctorList: React.FC<OrderDoctorListProps> = ({
  active,
  orders,
  removeQueries
}) => {
  return (
    <ListTbody>
      {orders.map((e) => (
        <OrderDoctorItem
          key={e.orderId}
          active={e.orderId === active}
          removeQueries={removeQueries}
          {...e} />
      ))}
    </ListTbody>)
}

export default OrderDoctorList