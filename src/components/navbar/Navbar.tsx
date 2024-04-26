'use client'

import { TextInput, rem, ScrollArea } from '@mantine/core';
import { IconProps, Icon, IconUsers, IconStethoscope, IconWheelchair, IconLicense, IconFolder, IconFolders, IconReportMedical, IconSettings, IconSearch } from '@tabler/icons-react';
import React, { ForwardRefExoticComponent, RefAttributes, useState } from 'react'
import classes from './Navbar.module.css';
import { NavLink } from './navlink/NavLink';
import { NavFooter } from './navfooter/NavFooter';
import { NavLogo } from './navlogo/NavLogo';
import { useSearch } from '@/hooks/useSearch';
import { NavLinkProp } from '@/lib/types/nav-link.type';
import { SystemLogo } from './navlogo/logos';

const LinkIcon: Record<string, ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>> = {
    "user": IconUsers,
    "patient": IconWheelchair,
    "doctor": IconStethoscope,
    "role": IconLicense,
    "morbidity": IconFolder,
    "morbidity-group": IconFolders,
    "report": IconReportMedical
}

interface NavbarProps {
    links: NavLinkProp[],
    logo: string,
    loading?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ links, logo, loading = false }) => {

    const [active, setActive] = useState<string>('');
    const search = useSearch(links, ['label']);

    const mainLinks = search.filter.map((item) => {
        return <NavLink
            key={item.label}
            href={item.address}
            active={active === item.label}
            link={{
                icon: item.icon ? LinkIcon[item.icon] : IconSettings,
                label: item.label
            }}
            onClick={() => {
                setActive(item.label);
            }} />
    });

    return (
        <nav className={classes.navbar}>
            <div className={classes.header}>
                <NavLogo logo={logo} />
            </div>

            <ScrollArea className={classes.links}>
                <TextInput
                    onChange={(e) => search.onSearch(e.target.value)}
                    value={search.search}
                    placeholder="Buscar"
                    style={{ position: 'sticky', top: 0 }}
                    size="xs"
                    leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
                    rightSectionWidth={70}
                    styles={{ section: { pointerEvents: 'none' } }}
                    mb="sm"
                />
                <div className={classes.linksInner}>{mainLinks}</div>
            </ScrollArea>

            <div className={classes.footer}>
                <NavFooter />
            </div>
        </nav>
    )
}

export { Navbar }