'use client'

import { Group, Code } from '@mantine/core';
import { IconBellRinging, IconReceipt2, IconFingerprint, IconKey, IconDatabaseImport, Icon2fa, IconSettings, IconSwitchHorizontal, IconLogout, IconProps, Icon } from '@tabler/icons-react';
import React, { ForwardRefExoticComponent, RefAttributes, useState } from 'react'
import styles from './Navbar.module.css';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useAuth } from '@/hooks';

interface LinkProp {
    link: string;
    label: string;
    icon: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>
}

const data: LinkProp[] = [
    { link: '', label: 'Notifications', icon: IconBellRinging },
    { link: '', label: 'Billing', icon: IconReceipt2 },
    { link: '', label: 'Security', icon: IconFingerprint },
    { link: '', label: 'SSH Keys', icon: IconKey },
    { link: '', label: 'Databases', icon: IconDatabaseImport },
    { link: '', label: 'Authentication', icon: Icon2fa },
    { link: '', label: 'Other Settings', icon: IconSettings }
];

const Navbar = () => {
    const [active, setActive] = useState('Billing');
    const { logout } = useAuth();

    const links = data.map((item) => (
        <a
            className={styles.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={styles.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarMain}>
                <Group className={styles.header} justify="space-between">
                    <MantineLogo size={28} inverted style={{ color: 'white' }} />
                    <Code fw={700}>v3.1.2</Code>
                </Group>
            </div>

            <div className={styles.linkGroup}>
                {links}
            </div>

            <div className={styles.footer}>
                <a href="#" className={styles.link} onClick={() => logout()}>
                    <IconLogout className={styles.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div>
        </nav>
    )
}

export default Navbar