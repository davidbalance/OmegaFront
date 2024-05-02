import { UnstyledButton, SimpleGrid, Flex, SimpleGridProps } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import React from 'react'
import cx from 'clsx';
import classes from './PatientCollapseButton.module.css'

type PatientCollapseButtonProps = SimpleGridProps & {
    opened?: boolean;
    toggle?: () => void;
}
const PatientCollapseButton: React.FC<PatientCollapseButtonProps> = ({ opened, toggle, children, cols, ...props }) => {
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

export { PatientCollapseButton }