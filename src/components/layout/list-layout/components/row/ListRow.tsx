import { Flex, rem, UnstyledButton } from "@mantine/core";
import classes from '../../styles/ListLayoutBase.module.css'
import cx from 'clsx';

interface ListRowProps {
    /**
     * Contenido interno de la fila.
     */
    children: React.ReactNode;
    /**
     * Estado de la fila.
     */
    active?: boolean;
    /**
     * Seccion izquierda que requiere un componente de react.
     */
    leftSection?: React.ReactNode;
    /**
     * Seccion derecha que requiere un componente de react.
     */
    rightSection?: React.ReactNode;
    /**
     * Estado que activa o desactiva el evento hover.
     */
    hover?: boolean;
    /**
     * Funcion que es invokada cuando se hace un click a la fila.
     * @returns 
     */
    onClick?: () => void;
}

const ListRow: React.FC<ListRowProps> = ({
    leftSection,
    rightSection,
    children,
    active = false,
    hover = true,
    onClick
}) => {
    return (
        <Flex
            px={rem(4)}
            py={rem(8)}
            w='100%'
            gap={rem(20)}
            className={classes['list-element']}>
            {leftSection && (
                <Flex align='center' className={classes['list-content']}>
                    {leftSection}
                </Flex>
            )}
            <UnstyledButton
                data-active={active}
                onClick={onClick}
                flex={1}
                className={cx(classes['list-content'], {
                    [classes.clickable]: !!onClick,
                    [classes.hoverable]: hover
                })}
            >
                {children}
            </UnstyledButton>
            {rightSection && (
                <Flex align='center' className={classes['list-content']}>
                    {rightSection}
                </Flex>
            )}
        </Flex>
    );
};

export { ListRow };
export type { ListRowProps };
