import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import { MedicalClientEmail } from '@/lib/dtos/medical/client/email/base.response.dto'
import { Box, Flex, Text } from '@mantine/core'
import React from 'react'
import { MedicaEmailActionDelete } from './medical-email-action-delete'
import { MedicalEmailActionDefault } from './medical-email-action-default'

interface MedicalClientEmailListBodyProps {
    email: MedicalClientEmail[]
}
const MedicalClientEmailListBody: React.FC<MedicalClientEmailListBodyProps> = ({
    email
}) => {
    return (
        <ListTbody>
            {email.map((e) => (
                <ListRow
                    active={e.default}
                    key={e.id}>
                    <Flex align='center'>
                        <Box flex={1}>
                            <Text>{e.email}</Text>
                        </Box>
                        <Flex align='center'>
                            <MedicalEmailActionDefault
                                id={e.id}
                                state={e.default} />
                            {!e.default ? <MedicaEmailActionDelete email={e.id} /> : null}
                        </Flex>
                    </Flex>
                </ListRow>
            ))}
        </ListTbody>
    )
}

export default MedicalClientEmailListBody