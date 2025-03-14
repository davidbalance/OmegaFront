import ListTbody from '@/components/_base/list/list-tbody';
import { MedicalOrderDoctor } from '@/server/medical_order/server_types';
import React from 'react'
import OrderDoctorItem from './order_doctor_item';

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