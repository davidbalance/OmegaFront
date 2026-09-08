"use client"

import { removeUserCompanyFilter } from '@/server'
import { UserCompanyFilter } from '@/server/user-attribute/server-types'
import { ActionIcon, Group, rem, Text } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React, { useCallback, useState } from 'react'

type CompanyFilterItemProps = UserCompanyFilter

const CompanyFilterItem: React.FC<CompanyFilterItemProps> = ({
    companyRuc,
    corporativeName,
    id,
    userId
}) => {

    const [loading, setLoading] = useState<boolean>(false)

    const handleClick = useCallback(async () => {
        setLoading(true)
        try {
            await removeUserCompanyFilter({
                filterId: id,
                userId: userId
            })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }, [id, userId])

    return (
        <Group w="100%" justify='space-between'>
            <Text size='md'>{corporativeName} - {companyRuc}</Text>
            <ActionIcon
                variant='transparent'
                loading={loading}
                onClick={handleClick}
            >
                <IconTrash style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
        </Group>
    )
}

export default CompanyFilterItem