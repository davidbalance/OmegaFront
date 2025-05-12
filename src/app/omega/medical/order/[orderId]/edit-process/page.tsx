import ReturnableHeader from '@/components/_base/returnable-header'
import { retriveMedicalOrder, retriveProcessOptions } from '@/server';
import React from 'react'
import { Option } from '@/lib/types/option.type';
import OrderProcessForm from './_components/order-process-form';

interface EditOrderProcessPageProps {
    params: { orderId: string }
}
const EditOrderProcessPage: React.FC<EditOrderProcessPageProps> = async ({
    params
}) => {

    const order = await retriveMedicalOrder(params.orderId);

    const processes = await retriveProcessOptions();
    const processOptions: Option[] = processes.map((e) => ({ label: e.orderProcess, value: e.orderProcess }));

    return (
        <>
            <ReturnableHeader title='Editar Proceso' />
            <OrderProcessForm
                orderId={params.orderId}
                data={{
                    process: order.orderProcess
                }}
                processOptions={processOptions} />
        </>
    )
}

export default EditOrderProcessPage