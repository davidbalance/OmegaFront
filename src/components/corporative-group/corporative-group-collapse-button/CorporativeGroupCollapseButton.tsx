import { UnstyledButton, SimpleGrid, Flex, SimpleGridProps } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import React from 'react'
import cx from 'clsx';
import classes from './CorporativeGroupCollapseButton.module.css'

type CorporativeGroupCollapseButtonProps = SimpleGridProps & {
    opened?: boolean;
    toggle?: () => void;
}
const CorporativeGroupCollapseButton: React.FC<CorporativeGroupCollapseButtonProps> = ({ opened, toggle, children, cols, ...props }) => {
    return (
        <UnstyledButton
            onClick={toggle}
            className={(cx(classes.header, { [classes.open]: opened }))}>
            <SimpleGrid {...props} cols={cols as number + 1}>
                {children}
                <Flex justify='center' align='center'>
                    <IconChevronDown stroke={2} className={classes.icon} />
                </Flex>
            </SimpleGrid>
        </UnstyledButton>
    )
}

export { CorporativeGroupCollapseButton }