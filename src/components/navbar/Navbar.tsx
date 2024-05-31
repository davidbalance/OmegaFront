'use client'

import { IconProps, Icon, IconUsers, IconStethoscope, IconWheelchair, IconLicense, IconFolder, IconFolders, IconReportMedical, IconSettings, IconMapPin, IconKey, IconLock } from '@tabler/icons-react';
import React, { ForwardRefExoticComponent, RefAttributes, useState } from 'react'
import classes from './Navbar.module.css';
import { NavLink } from './navlink/NavLink';
import { useSearch } from '@/hooks/useSearch';
import { NavLinkProp } from '@/lib/types/nav-link.type';
import cx from 'clsx';
import { ActionIcon, Box, Drawer, ScrollArea } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

const LinkIcon: Record<string, ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>> = {
    "user": IconUsers,
    "patient": IconWheelchair,
    "doctor": IconStethoscope,
    "role": IconLicense,
    "morbidity": IconFolder,
    "morbidity-group": IconFolders,
    "report": IconReportMedical,
    "location": IconMapPin,
    "key": IconKey,
}

interface NavbarProps {
    opened: boolean;
    onClose: () => void;
    links: NavLinkProp[],
    logo: string,
    loading?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ opened, onClose, links }) => {

    const [active, setActive] = useState<string>('');
    const search = useSearch(links, ['label']);

    const match = useMediaQuery('(max-width: 700px)', true, { getInitialValueInEffect: true });

    const [locked, { toggle }] = useDisclosure(false);

    const mainLinks = search.filter.map((item) => {
        return <NavLink
            opened={opened || locked}
            key={item.label}
            href={item.address}
            active={active}
            link={{
                icon: item.icon ? LinkIcon[item.icon] : IconSettings,
                label: item.label
            }}
            onClick={() => {
                setActive(item.label);
                onClose();
            }} />
    });

    return <>
        {
            match ? <Drawer
                opened={opened}
                onClose={onClose}
                overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                size='100%'
                closeButtonProps={{
                    size: 'sm'
                }}
            >
                <ScrollArea className={classes.links} h={450}>
                    <Box className={classes.linksInner}>{mainLinks}</Box>
                </ScrollArea>
            </Drawer>
                : <nav className={(cx(classes.navbar, { [classes.open]: opened || locked }))}>
                    <ScrollArea className={classes.links} h={450}>
                        <Box className={classes.linksInner}>{mainLinks}</Box>
                    </ScrollArea>
                    <Box className={cx(classes.lock, { [classes.open]: opened || locked })}>
                        <ActionIcon variant={locked ? 'filled' : 'transparent'} onClick={toggle}>
                            <IconLock />
                        </ActionIcon>
                    </Box>
                </nav>
        }
    </>
}

export { Navbar }