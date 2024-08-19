import { Box, Text, Tooltip } from '@mantine/core';
import Link, { LinkProps } from 'next/link'
import React, { ForwardRefExoticComponent, RefAttributes } from 'react'
import { IconProps, Icon } from '@tabler/icons-react';
import classes from './NavLink.module.css';
import cx from 'clsx';
import { usePathname } from 'next/navigation';

type NavIcon = ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>;

interface NavLinkProps extends Omit<LinkProps, 'data-active' | 'className'> {
    /**
     * Estado que indica que el boton debe encontrarse abierta.
     */
    opened?: boolean;
    /**
     * Direccion a la que se tiene que mover.
     */
    link: {
        icon: NavIcon,
        label: string,
        notifications?: number
    }
};

const NavLink: React.FC<NavLinkProps> = ({ opened, link, ...props }) => {
    const path = usePathname();

    return (
        <Tooltip
            label={link.label}
            position="right"
            withArrow
            transitionProps={{ duration: 0 }}
            key={link.label}
            disabled={opened}
        >
            <Link
                data-active={path === props.href || undefined}
                className={(cx(classes.mainLink, { [classes.open]: opened }))}
                {...props}>
                <Box className={classes.mainLinkInner}>
                    <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
                </Box>
                <Text component='span' className={(cx(classes.mainLinkText, { [classes.open]: opened }))}>
                    {link.label}
                </Text>
            </Link>
        </Tooltip>
    )
}

export { NavLink }