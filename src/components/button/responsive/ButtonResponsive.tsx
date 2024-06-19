import { Tooltip, ActionIcon, rem, Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconPlus, IconProps } from "@tabler/icons-react";
import React from "react";

interface ButtonResponsiveProps {
    label: string;
    onClick: () => void;
    icon?: React.ReactElement<IconProps>
    iconProps?: IconProps
}
const ButtonResponsive: React.FC<ButtonResponsiveProps> = ({ label, onClick, icon, iconProps }) => {

    const isMobile = useMediaQuery('(max-width: 50em)');

    return <>
        {
            isMobile ?
                <Tooltip
                    label={label}
                    withArrow>
                    <ActionIcon size='md' onClick={onClick} variant='light' radius='xl'>
                        {!icon ? <IconPlus style={{ width: rem(16), height: rem(16) }} /> : React.cloneElement(icon, { style: { width: rem(16), height: rem(16) }, ...iconProps })}
                    </ActionIcon>
                </Tooltip> :
                <Button
                    leftSection={!icon ? <IconPlus style={{ width: rem(20), height: rem(20) }} /> : React.cloneElement(icon, { style: { width: rem(16), height: rem(16) }, ...iconProps })}
                    onClick={onClick}
                    radius='xl'
                    size='xs'>
                    {label}
                </Button>
        }
    </>
}

export { ButtonResponsive };