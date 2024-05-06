import { Grid, Title, ActionIcon, Flex } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import React from 'react'

type SubLayoutFormTitleProps = {
    title: string;
    onClose: () => void;
}
const SubLayoutFormTitle: React.FC<SubLayoutFormTitleProps> = ({ title, onClose }) => {
    return <Grid>
        <Grid.Col span={10}>
            <Title
                order={6}
                tt="uppercase"
                component='span'
                c="omegaColors">
                {title}
            </Title>
        </Grid.Col>
        <Grid.Col span={2}>
            <Flex justify='center' align='center'>
                <ActionIcon variant='transparent' onClick={onClose} size='sm'>
                    <IconX />
                </ActionIcon>
            </Flex>
        </Grid.Col>
    </Grid>
}

export { SubLayoutFormTitle }