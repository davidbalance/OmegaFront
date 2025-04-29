import ListRow from '@/components/_base/list/list-row'
import { Box, Flex, Text } from '@mantine/core'
import React from 'react'
import { MedicalClientEmail } from '@/server/medical-client/server-types'
import EmailDefaultAction from './email-default-action'
import EmailDeleteAction from './email-delete-action'

type EmailItemProps = MedicalClientEmail;
const EmailItem: React.FC<EmailItemProps> = ({
    patientDni,
    emailDefault,
    emailId,
    emailValue
}) => {
    return (
        <ListRow active={emailDefault}>
            <Flex align='center'>
                <Box flex={1}>
                    <Text>{emailValue}</Text>
                </Box>
                <Flex align='center'>
                    <EmailDefaultAction
                        emailId={emailId}
                        patientDni={patientDni}
                        emailDefault={emailDefault} />
                    {!emailDefault ? <EmailDeleteAction
                        patientDni={patientDni}
                        emailId={emailId} /> : null}
                </Flex>
            </Flex>
        </ListRow>
    )
}

export default EmailItem