'use client'

import { IconProps, Icon, IconUsers, IconStethoscope, IconWheelchair, IconLicense, IconReportMedical, IconSettings, IconMapPin, IconKey, IconLock, IconVirus } from '@tabler/icons-react';
import React, { ForwardRefExoticComponent, RefAttributes, useState } from 'react'
import classes from './Navbar.module.css';
import cx from 'clsx';
import { ActionIcon, Box, Drawer, ScrollArea } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { RESOURCE_KEY } from '@/lib/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage/useLocalStorage';
import { NavLinkProp } from '@/lib/types/nav-link.type';
import { NavLink } from './nav/link/NavLink';

const LinkIcon: Record<string, ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>> = {
    "user": IconUsers,
    "patient": IconWheelchair,
    "doctor": IconStethoscope,
    "role": IconLicense,
    "morbidity": IconVirus,
    "report": IconReportMedical,
    "location": IconMapPin,
    "key": IconKey,
}

interface NavbarProps {
    opened: boolean;
    onClose: () => void;
    loading?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ opened, onClose }) => {

    const [active, setActive] = useState<string>('');
    const [locked, { toggle }] = useDisclosure(false);
    const match = useMediaQuery('(max-width: 700px)', true, { getInitialValueInEffect: true });
    const [link] = useLocalStorage<NavLinkProp[]>(RESOURCE_KEY, []);

    const mainLinks = link.map((item) => {
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
            match
                ? <Drawer
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