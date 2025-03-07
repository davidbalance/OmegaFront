import ReturnableHeader from '@/components/_base/returnable-header';
import OrderEmailOnCompleteReturn from '@/components/medical-order-mail/order_email_on_complete_return';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { retriveClientEmails } from '@/server/medical_client/actions';
import React from 'react'

type OrderEmailPageProps = {
    params: {
        orderId: string;
        patientDni: string;
    }
}
const OrderEmailPage: React.FC<OrderEmailPageProps> = async ({ params }) => {
    const emails = await retriveClientEmails(params.patientDni);

    const defaultEmail = emails.find(e => e.emailDefault);

    return (
        <ModularLayout>
            <ReturnableHeader title='Envio de correo' />
            <ModularBox>
                <OrderEmailOnCompleteReturn
                    orderId={params.orderId}
                    email={emails.map(e => e.emailValue)}
                    defaultEmail={defaultEmail?.emailValue} />
            </ModularBox>
        </ModularLayout>
    )
}

export default OrderEmailPage