import { Text, Tooltip } from '@mantine/core';
import Link, { LinkProps } from 'next/link'
import React, { ForwardRefExoticComponent, RefAttributes } from 'react'
import { IconProps, Icon } from '@tabler/icons-react';
import classes from './NavLink.module.css';
import cx from 'clsx';

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
    /**
     * Estado que indica si el boton esta habilitado o no.
     */
    active?: string;
};

const NavLink: React.FC<NavLinkProps> = ({ opened, link, active, ...props }) => {
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
                data-active={active === link.label || undefined}
                className={(cx(classes.mainLink, { [classes.open]: opened }))}
                {...props}>
                <div className={classes.mainLinkInner}>
                    <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
                </div>
                <Text component='span' className={(cx(classes.mainLinkText, { [classes.open]: opened }))}>{link.label}</Text>
            </Link>
        </Tooltip>
    )
}

export { NavLink }