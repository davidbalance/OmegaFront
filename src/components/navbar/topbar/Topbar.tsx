import React from 'react'
import classes from './Topbar.module.css'
import { Burger, Flex, Grid } from '@mantine/core';
import { TopbarMenu } from './TopbarMenu';
import { NavLogo } from '../nav/logo/NavLogo';

type TopbarProps = {
    burger: {
        opened: boolean;
        onClick: () => void;
    }
}

const Topbar: React.FC<TopbarProps> = ({ burger }) => {

    return (
        <Grid className={classes.wrapper}>
            <Grid.Col span={3}>
                <Flex justify='flex-start'>
                    <Burger
                        {...burger}
                        size='sm'
                        color='omegaColors'
                        aria-label="Toggle navigation" />
                </Flex>
            </Grid.Col>
            <Grid.Col span={6}>
                <Flex justify='center' align='center' h='100%'>
                    <NavLogo />
                </Flex>
            </Grid.Col>
            <Grid.Col span={3}>
                <Flex justify='flex-end'>
                    <TopbarMenu />
                </Flex>
            </Grid.Col>
        </Grid>
    )
}

export { Topbar };