import { Badge } from '@mantine/core';
import Link, { LinkProps } from 'next/link'
import React, { ForwardRefExoticComponent, RefAttributes } from 'react'
import { IconProps, Icon } from '@tabler/icons-react';
import classes from './NavLink.module.css'

type NavIcon = ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>;

type NavLinkProps = Omit<LinkProps, 'data-active' | 'className'> & {
    link: {
        icon: NavIcon,
        label: string,
        notifications?: number
    }
    active?: boolean;
};

const NavLink: React.FC<NavLinkProps> = ({ link, active, ...props }) => {
    return (
        <Link
            data-active={active || undefined}
            className={classes.mainLink}
            {...props}>
            <div className={classes.mainLinkInner}>
                <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
                <span>{link.label}</span>
            </div>
            {link.notifications && (
                <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
                    {link.notifications}
                </Badge>
            )}
        </Link>
    )
}

export { NavLink }