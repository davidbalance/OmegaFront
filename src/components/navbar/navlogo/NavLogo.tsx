import { Group, rem } from '@mantine/core'
import React, { useCallback, useEffect, useState } from 'react'
import classes from './NavLogo.module.css'
import { SystemLogo } from './logos'

type NavLogoProps = {
    logo: string;
}

const NavLogo: React.FC<NavLogoProps> = ({ logo }) => {

    const [CurrentLogo, setCurrentLogo] = useState<React.ReactElement | undefined>(undefined);

    useEffect(() => {
        const newLogo = getLogo();
        setCurrentLogo(newLogo);
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logo])


    const getLogo = (): React.ReactElement => {
        let Logo = SystemLogo.omega;
        if (Object.keys(SystemLogo).includes(logo)) {
            const key: keyof typeof SystemLogo = logo as any;
            Logo = SystemLogo[key];
        }
        // directly use Logo component with styles
        return <Logo style={{ width: rem(80) }} />;
    };

    return (
        <Group justify="center" align='center' className={classes.logo} gap={5}>
            {
                CurrentLogo ? CurrentLogo : <></>
            }
        </Group>
    )
}

export { NavLogo }