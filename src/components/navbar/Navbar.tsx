'use client'

import { Group, Code, Loader } from '@mantine/core';
import { IconLogout, IconProps, Icon, IconUser, IconUsers, IconStethoscope, IconWheelchair } from '@tabler/icons-react';
import React, { ForwardRefExoticComponent, RefAttributes, useState } from 'react'
import styles from './Navbar.module.css';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useAuth } from '@/hooks';
import { LinkProp } from '@/lib/interfaces.lib';
import Link from 'next/link';

const LinkIcon: Record<string, { icon: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>> }> = {
    "user": { icon: IconUsers },
    "patient": { icon: IconWheelchair },
    "doctor": { icon: IconStethoscope },
}

interface NavbarProps {
    links: LinkProp[],
    loading?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ links, loading = false }) => {
    const [active, setActive] = useState<string>('');
    const { logout } = useAuth();

    const navLinks = () => links.map((item) => {
        const icon = item.icon ? LinkIcon[item.icon] : null;
        return <Link
            className={styles.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={() => {
                setActive(item.label);
            }}
        >
            {
                icon && <icon.icon className={styles.linkIcon} stroke={1.5} />
            }
            <span>{item.label}</span>
        </Link>
    });

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarMain}>
                <Group className={styles.header} justify="space-between">
                    <MantineLogo size={28} inverted style={{ color: 'white' }} />
                    <Code fw={700}>v3.1.2</Code>
                </Group>
            </div>

            <div className={styles.linkGroup}>
                {loading ? <Loader color="blue" /> : navLinks()}
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