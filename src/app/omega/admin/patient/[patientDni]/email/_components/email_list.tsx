import ListTbody from '@/components/_base/list/list-tbody'
import React from 'react'
import { MedicalClientEmail } from '@/server/medical_client/server_types'
import EmailItem from './email_item'

interface EmailListProps {
    email: MedicalClientEmail[]
}
const EmailList: React.FC<EmailListProps> = ({
    email
}) => {
    return (
        <ListTbody>
            {email.map((e) => <EmailItem key={e.emailId} {...e} />)}
        </ListTbody>
    )
}

export default EmailList