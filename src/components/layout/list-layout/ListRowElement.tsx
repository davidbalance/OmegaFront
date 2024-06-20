import { Flex, rem, UnstyledButton } from "@mantine/core";
import classes from './ListLayout.module.css'
import cx from 'clsx';

interface ListRowElementProps {
    children: React.ReactNode;
    active?: boolean;
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;
    hover?: boolean;
    onClick?: () => void;
}

const ListRowElement: React.FC<ListRowElementProps> = ({
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

export { ListRowElement };
export type { ListRowElementProps };
