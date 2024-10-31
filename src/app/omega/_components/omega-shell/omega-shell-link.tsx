'use client'

import React from 'react'
import clsx from 'clsx'
import { Flex, Text, Tooltip } from '@mantine/core'
import Link, { LinkProps } from 'next/link'
import { useOmegaShell } from './omega-shell.context'

import classes from './omega-shell.module.css'
import { usePathname } from 'next/navigation'
import { NavIcon } from '@/components/navbar/NavIcon'

interface OmegaShellLinkProps extends Omit<LinkProps, 'data-active' | 'className' | 'children'> {
    href: string;
    label: string,
    icon: string;
}

const OmegaShellLink: React.FC<OmegaShellLinkProps> = ({ label, icon, ...props }) => {

    const { opened, close } = useOmegaShell();
    const path = usePathname();

    const Icon = NavIcon[icon]

    return (
        <Tooltip
            label={label}
            position="right"
            withArrow
            disabled={opened}>
            <Link
                onClick={close}
                className={clsx(classes.shellNavbarButton, classes.shellLink, { [classes.open]: opened })}
                data-active={path === props.href || undefined}
                {...props}>
                <Flex align='center'>
                    <Icon size={20} className={classes.icon} stroke={1.5} />
                </Flex>
                <Text
                    component='span'
                    className={(clsx(classes.text, { [classes.open]: opened }))}>
                    {label}
                </Text>
            </Link>
        </Tooltip>
    )
}

export default OmegaShellLink