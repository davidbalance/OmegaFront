import { Flex, rem, Box, Title, Text, UnstyledButton } from '@mantine/core';
import React, { ReactNode } from 'react';
import classes from './MultipleLayerItem.module.css';
import cx from 'clsx'

type MultipleLayerItemProps = {
    label: {
        title: string,
        description: string
    }
    onClick?: () => void;
    opened?: boolean;
    leftSection?: ReactNode;
    rightSection?: ReactNode;
    active?: boolean;
}
const MultipleLayerItem: React.FC<MultipleLayerItemProps> = ({ label, leftSection, rightSection, opened, onClick, active }) => {

    return (
        <UnstyledButton
            className={cx(classes.wrapper, { [classes.clickable]: !!onClick })}
            onClick={onClick}
            data-active={active}
            px={rem(8)}
            py={rem(4)}>
            <Flex
                direction='row'
                align='center'
                className={classes.inner}
                gap={rem(8)}
                px={rem(8)}>
                {
                    leftSection &&
                    <Flex className={classes.section} align='center'>
                        {leftSection}
                    </Flex>
                }
                <Box style={{ flex: 1 }}>
                    <Title order={5}>{label.title}</Title>
                    <Text size='sm' c='neutral.5'>{label.description}</Text>
                </Box>
                {
                    rightSection &&
                    <Flex className={classes.section} align='center'>
                        {rightSection}
                    </Flex>
                }
            </Flex>
        </UnstyledButton>
    )
}

export { MultipleLayerItem }