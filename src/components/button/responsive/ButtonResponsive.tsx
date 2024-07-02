import { Tooltip, ActionIcon, rem, Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconPlus, IconProps } from "@tabler/icons-react";
import React from "react";

interface ButtonResponsiveProps {
    /**
     * Etiqueta para el boton.
     */
    label: string;
    /**
     * Funcion que es llamada cuando se hace un click.
     * @returns 
     */
    onClick: () => void;
    /**
     * Icono para el boton
     */
    icon?: React.ReactElement<IconProps>
    /**
     * Props para el icono
     */
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