import ReturnableHeader from '@/components/_base/returnable-header';
import OrderEmailOnCompleteReturn from '@/components/medical-order-mail/order_email_on_complete_return';
import { retriveClientEmails } from '@/server';
import { rem, Box } from '@mantine/core';
import React from 'react'

type ModalSlotOrderEmailPageProps = {
    params: {
        orderId: string;
        patientDni: string;
    }
}
const ModalSlotOrderEmailPage: React.FC<ModalSlotOrderEmailPageProps> = async ({ params }) => {
    const emails = await retriveClientEmails(params.patientDni);

    const defaultEmail = emails.find(e => e.emailDefault);

    return (
        <Box component='div' px={rem(16)} py={rem(8)} pos='relative'>
            <ReturnableHeader title='Regresar' />
            <OrderEmailOnCompleteReturn
                orderId={params.orderId}
                email={emails.map(e => e.emailValue)}
                defaultEmail={defaultEmail?.emailValue} />
        </Box>
    )
}

export default ModalSlotOrderEmailPage